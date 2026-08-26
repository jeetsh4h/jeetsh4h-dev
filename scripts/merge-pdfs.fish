#!/usr/bin/env fish

function print_usage
    printf '%s\n' \
        'Usage: scripts/merge-pdfs.fish [OPTIONS] PDF...' \
        '' \
        'Merge one or more PDFs.' \
        '' \
        'Options:' \
        '  --current-order   Merge PDFs in argument order without an order prompt.' \
        '  --output PATH     Write to PATH without an output prompt.' \
        '  --help            Show this help.'
end

function print_pdf_order
    echo
    echo 'PDF order:'

    set -l index 1
    for pdf in $argv
        printf '  %d. %s\n' $index "$pdf"
        set index (math $index + 1)
    end
end

argparse help current-order 'output=' -- $argv
or begin
    print_usage >&2
    exit 2
end

if set -q _flag_help
    print_usage
    exit 0
end

set -l input_files $argv
set -l file_count (count $input_files)

if test $file_count -eq 0
    echo 'error: provide at least one input PDF.' >&2
    print_usage >&2
    exit 2
end

if not type -q pdfunite
    echo 'error: pdfunite is required. Install the Poppler utilities package for your system.' >&2
    exit 1
end

set -l resolved_input_files
for input_file in $input_files
    if not test -f "$input_file"
        echo "error: input file does not exist: $input_file" >&2
        exit 1
    end

    if not test -r "$input_file"
        echo "error: input file is not readable: $input_file" >&2
        exit 1
    end

    set --append resolved_input_files (path resolve "$input_file")
end

if not set -q _flag_current_order
    while true
        print_pdf_order $input_files
        echo 'Enter every item number in the desired order (for example: 3 1 2).'

        set -l order_line
        if not read --prompt-str 'Order (Enter keeps the order above): ' order_line
            echo 'error: order selection cancelled.' >&2
            exit 130
        end

        set order_line (string trim -- "$order_line")
        if test -z "$order_line"
            break
        end

        set -l requested_order (string match --all --regex '[^[:space:]]+' -- "$order_line")
        if test (count $requested_order) -ne $file_count
            echo "Please enter each number from 1 through $file_count exactly once." >&2
            continue
        end

        set -l seen_positions
        set -l reordered_files
        set -l valid_order true

        for position in $requested_order
            if not string match --quiet --regex '^[0-9]+$' -- "$position"
                set valid_order false
                break
            end

            if test "$position" -lt 1; or test "$position" -gt $file_count; or contains -- "$position" $seen_positions
                set valid_order false
                break
            end

            set --append seen_positions "$position"
            set --append reordered_files "$input_files[$position]"
        end

        if not $valid_order
            echo "Please enter each number from 1 through $file_count exactly once." >&2
            continue
        end

        set input_files $reordered_files
        break
    end
end

set -l output_file
set -l output_was_provided false

if set -q _flag_output
    set output_file $_flag_output
    set output_was_provided true
end

while true
    if not $output_was_provided
        if not read --prompt-str 'Output PDF: ' output_file
            echo 'error: output selection cancelled.' >&2
            exit 130
        end
    end

    set output_file (string trim -- "$output_file")
    if test -z "$output_file"
        echo 'Please provide an output path.' >&2
        if $output_was_provided
            exit 2
        end
        continue
    end

    if string match --quiet --regex '^~(/|$)' -- "$output_file"
        set output_file (string replace --regex '^~' "$HOME" -- "$output_file")
    end

    set -l output_directory (path dirname "$output_file")
    if not test -d "$output_directory"
        echo "error: output directory does not exist: $output_directory" >&2
        if $output_was_provided
            exit 1
        end
        continue
    end

    set -l resolved_output_file (path resolve "$output_file")
    if contains -- "$resolved_output_file" $resolved_input_files
        echo 'error: the output path must be different from every input path.' >&2
        if $output_was_provided
            exit 1
        end
        continue
    end

    if test -d "$output_file"
        echo "error: output path is a directory: $output_file" >&2
        if $output_was_provided
            exit 1
        end
        continue
    end

    if test -e "$output_file"; and not $output_was_provided
        set -l overwrite_answer
        if not read --prompt-str "Output exists. Overwrite '$output_file'? [y/N] " overwrite_answer
            echo 'error: output selection cancelled.' >&2
            exit 130
        end

        if not string match --quiet --regex '^(y|yes)$' -- (string lower -- (string trim -- "$overwrite_answer"))
            set output_file
            continue
        end
    end

    break
end

set -l output_directory (path dirname "$output_file")
set -l temporary_file (mktemp --tmpdir="$output_directory" --suffix=.pdf .merge-pdfs.XXXXXX)
or begin
    echo "error: could not create a temporary file in $output_directory" >&2
    exit 1
end

if not pdfunite $input_files "$temporary_file"
    set -l merge_status $status
    rm -f -- "$temporary_file"
    echo 'error: pdfunite could not merge the input files.' >&2
    exit $merge_status
end

if not mv -- "$temporary_file" "$output_file"
    set -l move_status $status
    rm -f -- "$temporary_file"
    echo "error: could not write output file: $output_file" >&2
    exit $move_status
end

echo "Merged $file_count PDF(s) into $output_file"

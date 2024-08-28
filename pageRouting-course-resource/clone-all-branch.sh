#!/bin/bash

repo="https://github.com/mschwarzmueller/nextjs-course-code.git"
base_dir="nextjs-course-code-all-branches"

# Increase Git buffer size
git config --global http.postBuffer 524288000

# Clone the repository
git clone --mirror "$repo" "$base_dir"
cd "$base_dir" || exit 1

# Get all branch names
branches=$(git branch -r | grep -v HEAD | sed 's/origin\///' | sed 's/^[[:space:]]*//')

# Create a directory for each branch and checkout its contents
for branch in $branches; do
    echo "Processing branch: $branch"
    mkdir -p "../$branch"
    git --work-tree="../$branch" checkout "$branch" -- .
done

# Clean up: remove the original clone
cd ..
rm -rf "$base_dir"

echo "All branches have been cloned into separate directories."

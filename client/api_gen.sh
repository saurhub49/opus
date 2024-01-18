#!/bin/bash

sleep 10

# Generate the apis
yarn openapi-generator-cli generate -i http://localhost:8080/v3/api-docs -g typescript-axios -o ./src/openapi

sleep 10

file_path="src/openapi/base.ts"

replacement_line='export const BASE_PATH = `http://localhost:8080`.replace(/\\/+$/,"");'

awk -v replacement="$replacement_line" '/export const BASE_PATH =/ {print replacement; next} 1' "$file_path" > temp.ts && mv temp.ts "$file_path"
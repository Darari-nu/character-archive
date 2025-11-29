#!/bin/bash

# Convert Photos
# We will just overwrite/re-convert everything to keep numbering simple and consistent
count=0
# Using ls to sort ensures consistent order, though not strictly necessary
for file in Photo/*.png; do
    sips -s format jpeg -Z 1024 "$file" --out "public/images/photos/photo_$count.jpg"
    ((count++))
done

echo "Converted $count photos."

# Convert Background (no change needed but good to keep)
for file in back/*.png; do
    sips -s format jpeg -Z 2048 "$file" --out "public/images/back/background.jpg"
    break
done

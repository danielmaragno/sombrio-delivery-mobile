#!/bin/bash

#rm android/app/src/main/assets/index.android.*

react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

# generate app-debug.apk
# cd android &&  ./gradlew clean && ./gradlew assembleDebug

# Generate app-release-(unsigned).apk
cd android && ./gradlew clean && ./gradlew assembleRelease

<img src="src/res/app_icon.png" width="280" height="280">

# Flagitect

A simple mobile app to design flags. It's completely Free and Open Source software,
released under the MIT license. It's written using React Native with the following
libraries:

- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob)
- [react-native-device-info](https://github.com/react-native-community/react-native-device-info)
- [React Native Async Storage](https://github.com/react-native-community/async-storage)

## Features

Flagitect allows you to design flags with ease.

- Set up a basic flag with proportions, divisions and colours.
- Export your design as SVGs or PNGs.
- Add charges. Everything from stars to piles to crosses and saltires.
- Repeat your charges to create pretty patterns!

## Links

- [Flagitect on Google Play](https://play.google.com/store/apps/details?id=com.flagitect)
- [Flagitect Subreddit](https://www.reddit.com/r/Flagitect)

## Setup for Prod

- Clone repo.
- Copy upload keystore from Google Drive and paste it inside `android/app`
- Update `android/gradle.properties` with keystore password from Google Drive.
- Run `./gradlew assembleRelease` inside the `android` folder to get the `.aab` file, and upload it to Google Play!

## License

Flagitect is released under the [MIT License](http://opensource.org/licenses/MIT).

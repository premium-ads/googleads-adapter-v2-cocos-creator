# googleads-adapter-v2-cocos-creator

Cocos Creator 3.7.3+ sample for the **PremiumAds AdMob mediation adapter v2**
(Android + iOS).

> **Skeleton notice.** This repository is a project skeleton — it ships the
> source code, native bridge templates, and CI, but the Cocos Creator IDE was
> not used to author the scene UI. Open the project in **Cocos Creator
> 3.7.3+** and wire up the demo scene's buttons in the Editor before
> building a native target.

## What is this?

The PremiumAds adapter is a Google Mobile Ads SDK _custom event_. Publishers
integrate the GMA SDK and request ads via standard GMA APIs; Google's
mediation waterfall picks PremiumAds when the AdMob console maps an ad unit
to the PremiumAds custom event class.

For Cocos Creator, "the GMA SDK" is provided by the
[`Google AdMob for Cocos Creator`](https://github.com/cocos/cocos-google-admob)
extension (install via Cocos Store). This repo demos all six ad formats:

- Banner
- Interstitial
- Rewarded
- RewardedInterstitial
- AppOpen
- NativeAd

## Repo layout

```
.
├── assets/
│   ├── PremiumAdsAdapter/       # the plugin (publisher copies this folder)
│   ├── scenes/HelloWorld.scene  # demo scene (skeleton — wire up in IDE)
│   └── scripts/HelloWorld.ts    # scene controller using `admob` extension
├── native/engine/
│   ├── android/                 # build.gradle, AndroidManifest.xml, Java bridge
│   └── ios/                     # Podfile.in, Info.plist.in, Obj-C++ bridge
├── settings/v2/packages/        # builder.json, project.json
└── .github/workflows/typecheck.yml
```

## Quick start

1. **Clone** and open in Cocos Creator IDE 3.7.3+ (3.8.x recommended).
2. **Install the `Google AdMob for Cocos Creator` extension** via Cocos
   Store (Cocos Dashboard → Extensions).
3. **Open the `HelloWorld` scene** under `assets/scenes/`. The scene file
   shipped here is empty (the IDE will populate it on first open). In the
   Editor:
   - Add a Camera and Canvas.
   - Add a Label (assign to `HelloWorld.statusLabel`).
   - Add 6 Buttons; for each, link the `Button.click` event to the matching
     handler on the `HelloWorld` script (`onTapBanner`, `onTapInterstitial`,
     `onTapRewarded`, `onTapRwInterstitial`, `onTapAppOpen`, `onTapNative`).
4. **Project → Build...** Pick Android or iOS. The IDE merges
   `native/engine/{android,ios}/` into the generated native project.
5. Open the generated project in Android Studio / Xcode and run on a
   device.

Full publisher integration walk-through and AdMob custom-event configuration
are published at <https://docs.premiumads.net/v2.0/docs/google-admob-cocos-creator>.

## Configure your AdMob IDs

Before building, fill in your own AdMob app ID and ad unit IDs in:

- `assets/scripts/HelloWorld.ts` — `UNITS` constants per platform
- `native/engine/android/AndroidManifest.xml` — `APPLICATION_ID` meta-data
- `native/engine/ios/Info.plist.in` — `GADApplicationIdentifier`

Each is currently set to `<your admob ad unit>` / `<your admob app id>` placeholders.

## Adapter coordinates

- **Android:** `net.premiumads.sdk:admob-adapter-v2:1.0.10`
  (JFrog `https://repo.premiumads.net/artifactory/mobile-ads-sdk/`)
- **iOS:** `pod 'PremiumAdsGoogleAdapter', '~> 1.0.8'` (CocoaPods trunk)
- **GMA:** `play-services-ads:23.6.0` (Android), `Google-Mobile-Ads-SDK ~> 13.0` (iOS)

## License

MIT — see [LICENSE](LICENSE).

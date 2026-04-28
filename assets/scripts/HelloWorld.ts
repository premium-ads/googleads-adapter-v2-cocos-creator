import { _decorator, Component, Label } from 'cc';
import { PremiumAdsAdapter } from '../PremiumAdsAdapter/PremiumAdsAdapter';
const { ccclass, property } = _decorator;

// IMPORTANT: install `Google AdMob for Cocos Creator` extension via Cocos Store.
// Extension exposes ad-format classes under a global `admob` namespace.
// See docs/INTEGRATION.md for setup. The exact API surface varies by extension
// version; the calls below use optional chaining so missing methods log a warning
// rather than crash. Adjust to match your installed extension's API.
declare const admob: any;

@ccclass('HelloWorld')
export class HelloWorld extends Component {
    @property(Label) statusLabel: Label = null!;

    // TODO: replace with your own AdMob ad unit IDs before shipping.
    private static readonly UNITS = {
        android: {
            banner:    '<your admob ad unit>',
            inter:     '<your admob ad unit>',
            rewarded:  '<your admob ad unit>',
            rwInter:   '<your admob ad unit>',
            appOpen:   '<your admob ad unit>',
            native:    '<your admob ad unit>',
        },
        ios: {
            banner:    '<your admob ad unit>',
            inter:     '<your admob ad unit>',
            rewarded:  '<your admob ad unit>',
            rwInter:   '<your admob ad unit>',
            appOpen:   '<your admob ad unit>',
            native:    '<your admob ad unit>',
        },
    };

    onLoad() {
        PremiumAdsAdapter.setDebug(true);
        this.setStatus('idle');
    }

    private isAndroid(): boolean {
        return (globalThis as any).cc?.sys?.platform === ((globalThis as any).cc?.sys?.Platform?.ANDROID);
    }

    private unitId(format: keyof typeof HelloWorld.UNITS.android): string {
        return this.isAndroid() ? HelloWorld.UNITS.android[format] : HelloWorld.UNITS.ios[format];
    }

    private setStatus(s: string) {
        if (this.statusLabel) this.statusLabel.string = `status: ${s}`;
        console.log(`[HelloWorld] ${s}`);
    }

    onTapBanner()         { admob?.Banner?.show?.(this.unitId('banner')); this.setStatus('Banner.show'); }
    onTapInterstitial()   { admob?.Interstitial?.load?.(this.unitId('inter'),    () => admob?.Interstitial?.show?.()); this.setStatus('Interstitial.load+show'); }
    onTapRewarded()       { admob?.Rewarded?.load?.(this.unitId('rewarded'),     () => admob?.Rewarded?.show?.()); this.setStatus('Rewarded.load+show'); }
    onTapRwInterstitial() { admob?.RewardedInterstitial?.load?.(this.unitId('rwInter'), () => admob?.RewardedInterstitial?.show?.()); this.setStatus('RwInterstitial.load+show'); }
    onTapAppOpen()        { admob?.AppOpen?.load?.(this.unitId('appOpen'),       () => admob?.AppOpen?.show?.()); this.setStatus('AppOpen.load+show'); }
    onTapNative()         { admob?.NativeAd?.load?.(this.unitId('native'),       (ad: any) => admob?.NativeAd?.bind?.(ad)); this.setStatus('NativeAd.load+bind'); }
}

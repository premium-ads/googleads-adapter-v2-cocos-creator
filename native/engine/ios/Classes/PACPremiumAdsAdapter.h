#import <Foundation/Foundation.h>

/**
 * Obj-C peer for the Cocos Creator TS plugin `PremiumAdsAdapter.setDebug`.
 * Invoked from JS via `jsb.reflection.callStaticMethod('PACPremiumAdsAdapter', 'setDebug:', enabled)`.
 */
@interface PACPremiumAdsAdapter : NSObject
+ (void)setDebug:(BOOL)enabled;
@end

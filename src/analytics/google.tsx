import { EnvConfig } from "#/configs/env";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

/** Tag manager */
// export function  TagManager  ()  {
//  	if (!EnvConfig.mode.prod) {
//  		return;
//  	}
//  	return <GoogleTagManager gtmId={EnvConfig.gtm_id} />;
//  };
/** Google Analytics */
export function GoogleAnalytics() {
  if (!EnvConfig.mode.prod) {
    return;
  }
  return <NextGoogleAnalytics gaId={EnvConfig.gaid} />;
}

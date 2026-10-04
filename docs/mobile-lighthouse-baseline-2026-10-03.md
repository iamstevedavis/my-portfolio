# Mobile Lighthouse baseline — 2026-10-03

Source: [PageSpeed Insights mobile report](https://pagespeed.web.dev/analysis/https-visda-ca/w6huwjun5v?form_factor=mobile)

This records the successful Lighthouse lab run embedded in the supplied report. One run is accepted as the requested point-in-time baseline; it is not a statistical summary of performance over time. It is **lab data, not real-user Core Web Vitals (CrUX) data**. The report has no CrUX field data. Although the report page displays Oct 3, 2026 at 8:48:10 PM, the Lighthouse result itself records `fetchTime` as `2026-10-04T00:48:13.292Z` (UTC).

## Run details

- URL: `https://visda.ca/`
- Lighthouse: 13.5.0
- Browser runtime: HeadlessChrome 153.0.8010.36 (Linux x86_64)
- Mobile emulation: 412 × 823 CSS pixels, device scale factor 1.75; emulated Moto G Power (2022), Android 11 user agent
- Throttling: simulated; 150 ms RTT, 1,638.4 Kbps throughput, 1.2× CPU slowdown
- Report: [view in PageSpeed Insights](https://pagespeed.web.dev/analysis/https-visda-ca/w6huwjun5v?form_factor=mobile)

## Scores and metrics

| Category / metric | Result |
| --- | ---: |
| Performance | 94 / 100 |
| Accessibility | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 100 / 100 |
| First Contentful Paint | 1.7 s |
| Largest Contentful Paint | 2.4 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 4.4 s |

## Limitations and follow-up

This report contains one successful Lighthouse result. The other report entries are missing-record errors, not additional runs. A direct PageSpeed Insights API request returned HTTP 429 (quota exceeded); repeated runs and a median are intentionally not required for this point-in-time baseline. Do not interpret the score as a measure of typical performance over time.

No performance budget or periodic check is recommended based on this single baseline run; revisit only if there is a concrete need to track performance. No analytics or RUM has been added. The report's lack of CrUX data is not evidence of good or bad real-user Core Web Vitals.

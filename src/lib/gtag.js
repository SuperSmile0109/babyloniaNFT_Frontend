export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GA_UA_ID = process.env.NEXT_PUBLIC_GA_UA_ID;


console.log(`Logging pageview for ${GA_TRACKING_ID}`);

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    console.log(`Logging pageview for ${url}`);
    if (typeof window !== 'undefined') {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    console.log(`Logging event for ${action}`);
    if (typeof elem !== 'undefined') {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
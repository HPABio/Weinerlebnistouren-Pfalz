import * as CookieConsent from "vanilla-cookieconsent";

// Get the current hostname (only available in browser)
const getHostname = (): string => {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }
  return "";
};

export const cookieConsentConfig: CookieConsent.CookieConsentConfig = {
  // Set the cookie name and expiration
  cookie: {
    name: "cc_cookie",
    domain: getHostname(),
    path: "/",
    sameSite: "Lax",
    expiresAfterDays: 365,
  },

  // GUI options
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  // Categories
  categories: {
    necessary: {
      enabled: true, // This category is enabled by default
      readOnly: true, // Users can't disable this category
    },
    analytics: {
      enabled: false,
      readOnly: false,
      autoClear: {
        cookies: [
          {
            name: /^_ga/, // Google Analytics cookies
          },
          {
            name: /^_gid/, // Google Analytics cookies
          },
        ],
      },
      // Services that belong to this category
      services: {
        ga4: {
          label: "Google Analytics 4",
          onAccept: () => {
            // Update GA4 consent when analytics cookies are accepted
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("consent", "update", {
                analytics_storage: "granted",
              });
            }
          },
          onReject: () => {
            // Update GA4 consent when analytics cookies are rejected
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("consent", "update", {
                analytics_storage: "denied",
              });
            }
          },
        },
      },
    },
    marketing: {
      enabled: false,
      readOnly: false,
      autoClear: {
        cookies: [
          {
            name: /^_gcl_/, // Google Ads cookies
          },
        ],
      },
      // Services that belong to this category
      services: {
        googleAds: {
          label: "Google Ads",
          onAccept: () => {
            // Update GA4 consent when marketing cookies are accepted
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("consent", "update", {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
              });
            }
          },
          onReject: () => {
            // Update GA4 consent when marketing cookies are rejected
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("consent", "update", {
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
              });
            }
          },
        },
      },
    },
  },

  // Language (German)
  language: {
    default: "de",
    translations: {
      de: {
        consentModal: {
          title: "Wir verwenden Cookies",
          description:
            "Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Sie können auswählen, welche Cookies Sie zulassen möchten.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          showPreferencesBtn: "Einstellungen verwalten",
          closeIconLabel: "Schließen",
          footer: `
            <a href="/datenschutz" target="_blank">Datenschutzerklärung</a>
          `,
        },
        preferencesModal: {
          title: "Cookie-Einstellungen",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          savePreferencesBtn: "Auswahl speichern",
          closeIconLabel: "Schließen",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Verwendung von Cookies",
              description:
                "Wir verwenden Cookies, um sicherzustellen, dass unsere Website ordnungsgemäß funktioniert, die Nutzung zu analysieren und personalisierte Inhalte anzuzeigen.",
            },
            {
              title:
                "Notwendige Cookies <span class='pm__badge'>Immer aktiv</span>",
              description:
                "Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.",
              linkedCategory: "necessary",
            },
            {
              title: "Analyse-Cookies",
              description:
                "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden.",
              linkedCategory: "analytics",
              cookieTable: {
                caption: "Cookie-Tabelle",
                headers: {
                  name: "Cookie",
                  domain: "Domain",
                  desc: "Beschreibung",
                },
                body: [
                  {
                    name: "_ga",
                    domain: getHostname(),
                    desc: "Wird von Google Analytics verwendet, um Besucher zu unterscheiden.",
                  },
                  {
                    name: "_gid",
                    domain: getHostname(),
                    desc: "Wird von Google Analytics verwendet, um Besucher zu unterscheiden.",
                  },
                ],
              },
            },
            {
              title: "Marketing-Cookies",
              description:
                "Diese Cookies werden verwendet, um Werbung zu schalten, die für Sie relevanter ist und Ihre Interessen berücksichtigt.",
              linkedCategory: "marketing",
            },
            {
              title: "Mehr Informationen",
              description:
                "Weitere Informationen zu unseren Cookie-Richtlinien finden Sie in unserer <a href='/datenschutz' target='_blank'>Datenschutzerklärung</a>.",
            },
          ],
        },
      },
    },
  },

  // Callback when consent changes (fired on first consent and on each page load)
  onConsent: ({ cookie }) => {
    // Update GA4 consent based on current cookie state
    if (typeof window !== "undefined" && (window as any).gtag) {
      const analyticsEnabled = CookieConsent.acceptedCategory("analytics");
      const marketingEnabled = CookieConsent.acceptedCategory("marketing");

      (window as any).gtag("consent", "update", {
        analytics_storage: analyticsEnabled ? "granted" : "denied",
        ad_storage: marketingEnabled ? "granted" : "denied",
        ad_user_data: marketingEnabled ? "granted" : "denied",
        ad_personalization: marketingEnabled ? "granted" : "denied",
      });
    }
  },

  // Callback when consent modal is shown for the first time
  onFirstConsent: ({ cookie }) => {
    console.log("onFirstConsent fired", cookie);
  },

  // Callback when categories or services are changed
  onChange: ({ changedCategories, changedServices }) => {
    console.log("onChange fired", changedCategories, changedServices);

    // Handle changes to analytics category
    if (changedCategories.includes("analytics")) {
      const analyticsEnabled = CookieConsent.acceptedCategory("analytics");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          analytics_storage: analyticsEnabled ? "granted" : "denied",
        });
      }
    }

    // Handle changes to marketing category
    if (changedCategories.includes("marketing")) {
      const marketingEnabled = CookieConsent.acceptedCategory("marketing");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          ad_storage: marketingEnabled ? "granted" : "denied",
          ad_user_data: marketingEnabled ? "granted" : "denied",
          ad_personalization: marketingEnabled ? "granted" : "denied",
        });
      }
    }
  },
};

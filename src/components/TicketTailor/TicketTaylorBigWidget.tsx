import { useEffect, useRef } from "react";

export default function TicketTailorBigWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    // Prevent duplicate script injection in development
    if (widget.querySelector('script')) return;

    const script = document.createElement("script");
    script.src = "https://cdn.tickettailor.com/js/widgets/min/widget.js";
    script.dataset.url = "https://www.tickettailor.com/events/weinerlebnistourenbrigittaheyl/2273918/select-date?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true";
    script.dataset.type = "inline";
    script.dataset.inlineMinimal = "true";
    script.dataset.inlineShowLogo = "false";
    script.dataset.inlineBgFill = "false";
    script.dataset.inlineInheritRefFromUrlParam = "";
    script.dataset.inlineRef = "website_widget";

    widget.appendChild(script);
  }, []);

  return (
    <div className="px-10 mx-auto max-w-3xl">
      <div className="tt-widget" ref={widgetRef}>
        <div className="tt-widget-fallback">
          <p>
            <a
              href="https://www.tickettailor.com/events/weinerlebnistourenbrigittaheyl/2273918/select-date?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true"
              target="_blank"
            >
              Click here to buy tickets
            </a>
            <br />
            <small>
              <a
                href="https://www.tickettailor.com?rf=wdg_311202"
                className="tt-widget-powered"
              >
                Sell tickets online with Ticket Tailor
              </a>
            </small>
          </p>
        </div>
      </div>
    </div>  
  );
}

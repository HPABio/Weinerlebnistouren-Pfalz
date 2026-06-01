import { useEffect, useRef } from "react";

const TICKET_TAILOR_SCRIPT_SRC =
  "https://cdn.tickettailor.com/js/widgets/min/widget.js";
const TICKET_TAILOR_POWERED_URL =
  "https://www.tickettailor.com?rf=wdg_311202";
const TOUR_DATES_WIDGET_URL =
  "https://www.tickettailor.com/events/weinerlebnistourenbrigittaheyl/2209664/select-date?ref=website_widget&show_search_filter=true&show_date_filter=true&show_sort=true";
const CALENDAR_WIDGET_URL =
  "https://www.tickettailor.com/all-tickets-calendar/weinerlebnistourenbrigittaheyl/?ref=website_widget";

interface TicketTailorWidgetProps {
  className?: string;
}

const useTicketTailorScript = (widgetUrl: string) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;

    if (!widget) {
      return;
    }

    const script = document.createElement("script");
    script.src = TICKET_TAILOR_SCRIPT_SRC;
    script.dataset.url = widgetUrl;
    script.dataset.type = "inline";
    script.dataset.inlineMinimal = "true";
    script.dataset.inlineShowLogo = "false";
    script.dataset.inlineBgFill = "false";
    script.dataset.inlineInheritRefFromUrlParam = "";
    script.dataset.inlineRef = "website_widget";

    widget.appendChild(script);

    return () => {
      script.remove();
    };
  }, [widgetUrl]);

  return widgetRef;
};

export const TicketTailorTourDatesWidget = ({
  className,
}: TicketTailorWidgetProps) => {
  const widgetRef = useTicketTailorScript(TOUR_DATES_WIDGET_URL);

  return (
    <div className={className}>
      <div className="tt-widget" ref={widgetRef}>
        <div className="tt-widget-fallback">
          <p>
            <a href={TOUR_DATES_WIDGET_URL} target="_blank">
              Click here to buy tickets
            </a>
            <br />
            <small>
              <a
                href={TICKET_TAILOR_POWERED_URL}
                className="tt-widget-powered">
                Sell tickets online with Ticket Tailor
              </a>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export const TicketTailorCalendarWidget = ({
  className,
}: TicketTailorWidgetProps) => {
  const widgetRef = useTicketTailorScript(CALENDAR_WIDGET_URL);

  return (
    <div className={className}>
      <div className="tt-widget" ref={widgetRef}>
        <div className="tt-widget-fallback">
          <p>
            <a href={CALENDAR_WIDGET_URL} target="_blank">
              Click here to buy tickets
            </a>
            <br />
            <small>
              <a
                href={TICKET_TAILOR_POWERED_URL}
                className="tt-widget-powered">
                Sell tickets online with Ticket Tailor
              </a>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

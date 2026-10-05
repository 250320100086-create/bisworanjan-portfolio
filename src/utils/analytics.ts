export type AnalyticsEventType =
  | 'portfolio_visit'
  | 'project_opened'
  | 'resume_viewed'
  | 'resume_downloaded'
  | 'portfolio_pdf_downloaded'
  | 'portfolio_qr_downloaded'
  | 'qr_downloaded'
  | 'portfolio_url_copied'
  | 'portfolio_shared'
  | 'developer_profile_copied'
  | 'github_clicked'
  | 'linkedin_clicked'
  | 'contact_form_submitted'
  | 'playground_run'
  | 'search_performed';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  details?: Record<string, string | number | boolean>;
  timestamp: string;
}

const STORAGE_KEY = 'bp_portfolio_analytics_events';
const VISIT_RECORDED_KEY = 'bp_portfolio_session_visit';

export const analytics = {
  track(type: AnalyticsEventType, details?: Record<string, string | number | boolean>) {
    try {
      if (typeof window === 'undefined') return;

      const event: AnalyticsEvent = {
        type,
        details,
        timestamp: new Date().toISOString(),
      };

      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const events: AnalyticsEvent[] = existingRaw ? JSON.parse(existingRaw) : [];

      // Keep maximum last 100 non-sensitive event logs to avoid storage bloat
      events.unshift(event);
      if (events.length > 100) events.length = 100;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // Gracefully ignore storage quota or private browsing errors
    }
  },

  trackSessionVisitOnce() {
    try {
      if (typeof window === 'undefined') return;
      if (!sessionStorage.getItem(VISIT_RECORDED_KEY)) {
        sessionStorage.setItem(VISIT_RECORDED_KEY, 'true');
        this.track('portfolio_visit', {
          referrer: document.referrer ? 'external' : 'direct',
          screen: `${window.innerWidth}x${window.innerHeight}`,
        });
      }
    } catch {
      // Gracefully ignore
    }
  },

  getStats(): { totalEvents: number; countsByType: Record<string, number>; recentEvents: AnalyticsEvent[] } {
    try {
      if (typeof window === 'undefined') return { totalEvents: 0, countsByType: {}, recentEvents: [] };
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const events: AnalyticsEvent[] = existingRaw ? JSON.parse(existingRaw) : [];

      const countsByType: Record<string, number> = {};
      events.forEach((ev) => {
        countsByType[ev.type] = (countsByType[ev.type] || 0) + 1;
      });

      return {
        totalEvents: events.length,
        countsByType,
        recentEvents: events.slice(0, 25),
      };
    } catch {
      return { totalEvents: 0, countsByType: {}, recentEvents: [] };
    }
  },

  clearEvents() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Gracefully ignore
    }
  },
};

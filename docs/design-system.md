{
  "brand": {
    "name": "30tools",
    "theme": {
      "mode": "light",
      "accentColor": "#3b82f6",
      "background": "#ffffff",
      "foreground": "#0f172a",
      "muted": "#f1f5f9",
      "borderRadius": "1.25rem",
      "shadow": "md"
    },
    "font": {
      "heading": "Inter, sans-serif",
      "body": "Inter, sans-serif",
      "mono": "JetBrains Mono, monospace"
    }
  },
  "layout": {
    "container": {
      "width": "max-w-2xl",
      "padding": "p-6 md:p-8",
      "rounded": "2xl",
      "shadow": "shadow-md",
      "background": "bg-white dark:bg-neutral-900"
    },
    "header": {
      "showLogo": true,
      "logoSize": "w-10 h-10",
      "align": "center",
      "titleSize": "text-2xl font-semibold tracking-tight",
      "subtitleStyle": "text-muted-foreground text-sm"
    },
    "footer": {
      "showCredits": true,
      "creditsText": "Built with ❤️ by Shaswat Raj • 30tools.com",
      "align": "center",
      "padding": "py-4",
      "border": "border-t border-muted"
    }
  },
  "components": {
    "input": {
      "variant": "outline",
      "rounded": "lg",
      "padding": "p-3",
      "focusRing": "ring-2 ring-blue-500",
      "placeholderStyle": "text-muted-foreground"
    },
    "button": {
      "variant": "default",
      "rounded": "xl",
      "size": "lg",
      "padding": "px-5 py-2.5",
      "fontWeight": "medium",
      "hoverEffect": "hover:scale-[1.02] hover:shadow",
      "transition": "transition-all duration-200 ease-in-out"
    },
    "card": {
      "variant": "default",
      "rounded": "2xl",
      "shadow": "shadow-sm hover:shadow-md transition",
      "padding": "p-4 md:p-6",
      "background": "bg-white dark:bg-neutral-900"
    },
    "textarea": {
      "rounded": "xl",
      "resize": "none",
      "rows": 5,
      "padding": "p-3",
      "focusRing": "ring-2 ring-blue-500"
    },
    "badge": {
      "variant": "secondary",
      "rounded": "full",
      "padding": "px-3 py-1",
      "textStyle": "text-sm font-medium"
    }
  },
  "animations": {
    "enableFramerMotion": true,
    "cardEnter": "fadeInUp",
    "buttonHover": "scaleUp",
    "inputFocus": "glowBlue"
  },
  "aiTools": {
    "template": {
      "header": {
        "icon": true,
        "title": true,
        "subtitle": true
      },
      "inputSection": {
        "fields": [
          { "type": "textarea", "label": "Enter your text", "placeholder": "Type or paste here..." }
        ],
        "actionButton": {
          "label": "Generate",
          "icon": "Sparkles"
        }
      },
      "outputSection": {
        "showCopyButton": true,
        "showDownloadButton": false,
        "outputType": "text"
      }
    }
  },
  "styleRules": {
    "useTailwind": true,
    "spacingScale": [4, 8, 12, 16, 24],
    "cornerStyle": "rounded-2xl",
    "shadowStyle": "soft",
    "animationStyle": "subtle"
  }
}

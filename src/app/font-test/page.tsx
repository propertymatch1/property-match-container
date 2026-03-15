export default function FontTestPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h1 className="mb-4 text-2xl font-bold">Font Loading Test</h1>

        {/* Default body font test */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Default Body Font (neue-haas-grotesk-text)
          </h3>
          <p>Identia is awesome</p>
          <p className="mt-2 text-sm text-gray-600">
            Font-family:{" "}
            {typeof window !== "undefined"
              ? getComputedStyle(document.body).fontFamily
              : "neue-haas-grotesk-text"}
          </p>
        </div>

        {/* Hero title test */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Hero Title Class (neue-haas-grotesk-display)
          </h3>
          <h1 className="hero-title">Identia is awesome</h1>
          <p className="mt-2 text-sm text-gray-600">
            Should be neue-haas-grotesk-display, 600 weight
          </p>
        </div>

        {/* Section title test */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Section Title Class (neue-haas-grotesk-display)
          </h3>
          <h2 className="section-title">Identia is awesome</h2>
          <p className="mt-2 text-sm text-gray-600">
            Should be neue-haas-grotesk-display, 500 weight
          </p>
        </div>

        {/* Body text test */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Body Text Class (neue-haas-grotesk-text)
          </h3>
          <p className="body-text">Identia is awesome</p>
          <p className="mt-2 text-sm text-gray-600">
            Should be neue-haas-grotesk-text with responsive sizing
          </p>
        </div>

        {/* Label text test */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Label Text Class (neue-haas-grotesk-text)
          </h3>
          <p className="label-text">Identia is awesome</p>
          <p className="mt-2 text-sm text-gray-600">
            Should be neue-haas-grotesk-text, 600 weight, uppercase
          </p>
        </div>

        {/* Font weight variations */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">Font Weight Tests</h3>
          <div className="space-y-2">
            <p
              style={{ fontFamily: "neue-haas-grotesk-text", fontWeight: 400 }}
            >
              Identia is awesome - Text 400 (Normal)
            </p>
            <p
              style={{ fontFamily: "neue-haas-grotesk-text", fontWeight: 500 }}
            >
              Identia is awesome - Text 500 (Medium)
            </p>
            <p
              style={{ fontFamily: "neue-haas-grotesk-text", fontWeight: 700 }}
            >
              Identia is awesome - Text 700 (Bold)
            </p>
            <p
              style={{
                fontFamily: "neue-haas-grotesk-display",
                fontWeight: 500,
              }}
            >
              Identia is awesome - Display 500 (Medium)
            </p>
            <p
              style={{
                fontFamily: "neue-haas-grotesk-display",
                fontWeight: 600,
              }}
            >
              Identia is awesome - Display 600 (Semi-Bold)
            </p>
          </div>
        </div>

        {/* Italic variations */}
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">Italic Tests</h3>
          <div className="space-y-2">
            <p
              style={{
                fontFamily: "neue-haas-grotesk-text",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              Identia is awesome - Text 400 Italic
            </p>
            <p
              style={{
                fontFamily: "neue-haas-grotesk-text",
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              Identia is awesome - Text 500 Italic
            </p>
            <p
              style={{
                fontFamily: "neue-haas-grotesk-text",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              Identia is awesome - Text 700 Italic
            </p>
            <p
              style={{
                fontFamily: "neue-haas-grotesk-display",
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              Identia is awesome - Display 500 Italic
            </p>
            <p
              style={{
                fontFamily: "neue-haas-grotesk-display",
                fontWeight: 600,
                fontStyle: "italic",
              }}
            >
              Identia is awesome - Display 600 Italic
            </p>
          </div>
        </div>

        {/* Fallback test */}
        <div className="rounded border bg-yellow-50 p-4">
          <h3 className="mb-2 font-semibold">
            Fallback Test (Should look different if fonts aren't loaded)
          </h3>
          <p style={{ fontFamily: "sans-serif" }}>
            Identia is awesome - Generic Sans-Serif (This should look
            different!)
          </p>
        </div>
      </div>

      <div className="mt-8 rounded bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold">How to Test:</h3>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>
            All text above (except the fallback test) should look consistent and
            use Neue Haas Grotesk
          </li>
          <li>
            The fallback test should look noticeably different (more generic)
          </li>
          <li>
            Open browser dev tools and check the computed font-family for each
            element
          </li>
          <li>If fonts aren't loading, you'll see browser defaults instead</li>
          <li>
            Check the Network tab to see if the Adobe Typekit CSS is loading
          </li>
        </ul>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { useState } from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [quote, setQuote] = useState();
  const [colorCount, setColorCount] = useState(0);

  const colors = [
    "navy",
    "BlueViolet",
    "orange",
    "olive",
    "blue",
    "teal",
    "purple",
    "peru",
    "springgreen",
    "fuchsia",
    "maroon",
    "red",
    "green",
    "black",
  ];
  const [color, setColor] = useState(colors[colorCount]);

  async function fetchQuote() {
    console.log("fetching");
    const headers = {
      "X-Api-Key": "oW+IOFeERmBP1tNtr7hLhg==QoHEoipkPuLqleuF",
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=`,
      { headers }
    );
    return response.json();
  }

  const fetchData = async () => {
    let quoteData = await fetchQuote();
    setQuote(quoteData);
  };

  const fetchDataOnClick = async () => {
    await fetchData();
    if (colorCount < colors.length - 1) {
      setColorCount((prev) => {
        setColor(colors[prev + 1]);
        return prev + 1;
      });
    } else {
      setColorCount(0);
      setColor(colors[0]);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  return (
    <div className="container" style={{ background: `${color}` }}>
      <div className="wrapper" id="quote-box">
        {quote !== undefined && (
          <>
            <div className="text" id="text" style={{ color: `${color}` }}>
              {`"${quote[0].quote}"`}
            </div>
            <div className="author" id="author" style={{ color: `${color}` }}>
              {quote[0].author}
            </div>
            <div className="interactives">
              <button
                onClick={() => fetchDataOnClick()}
                className="new-quote"
                id="new-quote"
                style={{ background: `${color}` }}
              >
                New Quote
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=%22${quote[0].quote}%22%20${quote[0].author}`}
                className="twitter-share-button"
                target="_blank"
                id="tweet-quote"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="twitter-icon"
                  style={{ background: `${color}` }}
                />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

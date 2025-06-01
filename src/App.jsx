import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import quotes from "@/assets/quotes.json";

function getRandomQuote(current) {
  let newQuote;
  do {
    newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  } while (newQuote === current);
  return newQuote;
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function sendNotification(quote) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Daily Quote", { body: quote });
  }
}

export default function App() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const cachedQuote = localStorage.getItem("daily-quote");
    const date = localStorage.getItem("quote-date");
    const today = new Date().toDateString();

    if (cachedQuote && date === today) {
      setQuote(cachedQuote);
    } else {
      const newQuote = getRandomQuote("");
      setQuote(newQuote);
      localStorage.setItem("daily-quote", newQuote);
      localStorage.setItem("quote-date", today);
      sendNotification(newQuote);
    }

    requestNotificationPermission();
  }, []);

  const handleNewQuote = () => {
    const newQuote = getRandomQuote(quote);
    setQuote(newQuote);
    localStorage.setItem("daily-quote", newQuote);
    localStorage.setItem("quote-date", new Date().toDateString());
    sendNotification(newQuote);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
      <h1>Daily Quote App</h1>
      <Card>
        <CardContent>
          <p style={{ fontSize: "1.25rem", fontStyle: "italic" }}>{quote}</p>
        </CardContent>
      </Card>
      <Button onClick={handleNewQuote}>New Quote</Button>
    </div>
  );
}

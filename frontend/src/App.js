import React, { useState } from "react";
import Splash from "./Splash";
import Dashboard from "./Dashboard";
import ResumeAnalyzer from "./ResumeAnalyzer";
import Chatbot from "./ChatAssistant";
import ResumeMaker from "./ResumeMaker";
import InterviewAssistant from "./InterviewAssistant";
import Roadmap from "./Roadmap";

function App() {
  const [screen, setScreen] = useState("Splash");

  return (
    <>
      {screen === "Splash" && (
        <Splash onEnter={() => setScreen("Dashboard")} />
      )}

      {screen === "Dashboard" && (
        <Dashboard
          onNavigate={(featureId) => {
            if (featureId === "analyzer") {
              setScreen("analyzer");
            }
            if (featureId === "Chatbot") {
              setScreen("Chatbot");
            }
            if (featureId === "ResumeMaker") {
              setScreen("ResumeMaker");
            }
            if (featureId === "interview") {
              setScreen("interview");
            }
            if (featureId === "roadmap") {
              setScreen("roadmap");
            }
          }}
        />
      )}

      {screen === "analyzer" && (
        <ResumeAnalyzer />
      )}

      {screen === "Chatbot" && (
        <Chatbot />
      )}

      {screen === "ResumeMaker" && (
        <ResumeMaker />
      )}

      {screen === "interview" && (
        <InterviewAssistant />
      )}
      {screen === "roadmap" && (
        <Roadmap />
      )}
    </>
  );
}

export default App;
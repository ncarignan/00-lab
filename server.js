const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Survey questions
const surveyQuestions = [
  {
      id: 1,
          question: "What's your favorite hobby or activity to do outside of work?",
              type: "short answer"
                },
                  {
                      id: 2,
                          question: "What's the best book or podcast you've consumed recently and why did you enjoy it?",
                              type: "short answer"
                                },
                                  {
                                      id: 3,
                                          question: "Do you have a favorite sports team or athlete?",
                                              type: "short answer"
                                                },
                                                  {
                                                      id: 4,
                                                          question: "What's your go-to spontaneous weekend activity?",
                                                              type: "short answer"
                                                                },
                                                                  {
                                                                      id: 5,
                                                                          question: "What's one thing you're looking forward to doing in the next year?",
                                                                              type: "short answer"
                                                                                },
                                                                                  {
                                                                                      id: 6,
                                                                                          question: "What's your favorite type of music or artist?",
                                                                                              type: "short answer"
                                                                                                },
                                                                                                  {
                                                                                                      id: 7,
                                                                                                          question: "Have you traveled to any exciting places recently or have any upcoming trips planned?",
                                                                                                              type: "short answer"
                                                                                                                },
                                                                                                                  {
                                                                                                                      id: 8,
                                                                                                                          question: "Do you have any pets? If so, what kind?",
                                                                                                                              type: "short answer"
                                                                                                                                },
                                                                                                                                  {
                                                                                                                                      id: 9,
                                                                                                                                          question: "What's your favorite type of food or cuisine?",
                                                                                                                                              type: "short answer"
                                                                                                                                                },
                                                                                                                                                  {
                                                                                                                                                      id: 10,
                                                                                                                                                          question: "What's one thing you're passionate about that might surprise people?",
                                                                                                                                                              type: "short answer"
                                                                                                                                                                }
                                                                                                                                                                ];

                                                                                                                                                                // Store for survey responses
                                                                                                                                                                let responses = [];

                                                                                                                                                                // Function to group responses by common interests
                                                                                                                                                                function groupResponses(responses) {
                                                                                                                                                                  const groupedResponses = {
                                                                                                                                                                      sports: [],
                                                                                                                                                                          music: [],
                                                                                                                                                                              food: [],
                                                                                                                                                                                  travel: [],
                                                                                                                                                                                      hobbies: []
                                                                                                                                                                                        };

                                                                                                                                                                                          responses.forEach((response) => {
                                                                                                                                                                                              if (response.sportsTeam) {
                                                                                                                                                                                                    groupedResponses.sports.push(response);
                                                                                                                                                                                                        }
                                                                                                                                                                                                            if (response.music) {
                                                                                                                                                                                                                  groupedResponses.music.push(response);
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                          if (response.food) {
                                                                                                                                                                                                                                groupedResponses.food.push(response);
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                        if (response.travel) {
                                                                                                                                                                                                                                              groupedResponses.travel.push(response);
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                      if (response.hobby) {
                                                                                                                                                                                                                                                            groupedResponses.hobbies.push(response);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                    return groupedResponses;
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    // API endpoint to get survey questions
                                                                                                                                                                                                                                                                    app.get("/api/survey", (req, res) => {
                                                                                                                                                                                                                                                                      res.json(surveyQuestions);
                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                      // API endpoint to submit survey response
                                                                                                                                                                                                                                                                      app.post("/api/survey", (req, res) => {
                                                                                                                                                                                                                                                                        const response = req.body;
                                                                                                                                                                                                                                                                          responses.push(response);
                                                                                                                                                                                                                                                                            const groupedResponses = groupResponses(responses);
                                                                                                                                                                                                                                                                              res.json(groupedResponses);
                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                              // API endpoint to get grouped responses
                                                                                                                                                                                                                                                                              app.get("/api/responses", (req, res) => {
                                                                                                                                                                                                                                                                                const groupedResponses = groupResponses(responses);
                                                                                                                                                                                                                                                                                  res.json(groupedResponses);
                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                  // Serve static files from the public folder
                                                                                                                                                                                                                                                                                  app.use(express.static("public"));

                                                                                                                                                                                                                                                                                  // Start the server
                                                                                                                                                                                                                                                                                  app.listen(port, () => {
                                                                                                                                                                                                                                                                                    console.log(`Server started on port ${port}`);
                                                                                                                                                                                                                                                                                    });
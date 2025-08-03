import React, { useState, useEffect } from 'react';
import { Book, Award, Gamepad2, ChevronRight, Trophy, Check, Target, Star, Play, RefreshCw, X, Zap, Timer } from 'lucide-react';

const BartenderStudyGuide = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameState, setGameState] = useState({});
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);

  const userStats = {
    cardsStudied: 127,
    quizScores: { easy: 85, hard: 72 },
    achievements: 8,
    totalProgress: 34
  };

  const learningCategories = [
    {
      name: "Introduction to Bartending",
      icon: "🎯",
      lessons: 5,
      completed: 3,
      description: "Essential foundations from the Tipsy Bartender Exclusive Course",
      lessonList: [
        { id: 1, title: "Course Introduction & Building Confidence", completed: true },
        { id: 2, title: "The 5-Step Cocktail Making System", completed: true },
        { id: 3, title: "Setting Up Your Home Bar", completed: true },
        { id: 4, title: "Basic Bartending Vocabulary & Terms", completed: false },
        { id: 5, title: "Safety, Hygiene, and Responsible Service", completed: false }
      ]
    },
    {
      name: "Alcohol Knowledge",
      icon: "🥃",
      lessons: 6,
      completed: 2,
      description: "Master the 6 main liquors, liqueurs, and their applications",
      lessonList: [
        { id: 1, title: "The 6 Main Types of Liquor", completed: true },
        { id: 2, title: "Understanding Liqueurs vs Liquors", completed: true },
        { id: 3, title: "Vodka: The Neutral Spirit", completed: false },
        { id: 4, title: "Whiskey: Types, Aging, and Characteristics", completed: false },
        { id: 5, title: "Tequila: From Blue Agave to Your Glass", completed: false },
        { id: 6, title: "Rum, Gin, and Brandy Essentials", completed: false }
      ]
    },
    {
      name: "Bar Tools & Techniques",
      icon: "🛠️",
      lessons: 4,
      completed: 1,
      description: "Master essential tools and mixing techniques",
      lessonList: [
        { id: 1, title: "Essential Bar Tools & Equipment", completed: true },
        { id: 2, title: "When to Shake vs Stir", completed: false },
        { id: 3, title: "Measuring and Pouring Techniques", completed: false },
        { id: 4, title: "Garnishing and Presentation", completed: false }
      ]
    },
    {
      name: "Ice Mastery",
      icon: "🧊",
      lessons: 3,
      completed: 1,
      description: "The foundation ingredient that affects every drink",
      lessonList: [
        { id: 1, title: "The 5 Types of Ice and When to Use Each", completed: true },
        { id: 2, title: "How to Make Crystal Clear Ice", completed: false },
        { id: 3, title: "Ice's Impact on Taste and Presentation", completed: false }
      ]
    }
  ];

  const flashCardCategories = [
    {
      name: "Alcohol Fundamentals",
      icon: "🥃",
      levels: ["Basics", "Advanced"],
      progress: { basics: 90, advanced: 60 },
      cardCount: { basics: 25, advanced: 30 }
    },
    {
      name: "Bar Tools & Equipment", 
      icon: "🍸",
      levels: ["Basics", "Advanced"],
      progress: { basics: 100, advanced: 80 },
      cardCount: { basics: 20, advanced: 25 }
    }
  ];

  const sampleFlashCards = {
    "Alcohol Fundamentals": {
      basics: [
        {
          front: "What are the 6 main types of liquor?",
          back: "Vodka, Rum, Gin, Tequila, Whiskey, and Brandy. These are the foundational spirits that form the base of most cocktails."
        },
        {
          front: "What's the difference between liquor and liqueur?",
          back: "Liquor (spirits) are distilled alcoholic beverages with higher alcohol content (40%+ ABV). Liqueurs are sweetened spirits with added flavors, typically 15-30% ABV."
        }
      ],
      advanced: [
        {
          front: "What makes tequila different from other agave spirits?",
          back: "Tequila must be made from blue agave (Weber tequilana azul) and produced in specific Mexican regions. It requires minimum 51% blue agave (mixto) or 100% blue agave for premium."
        }
      ]
    },
    "Bar Tools & Equipment": {
      basics: [
        {
          front: "When do you shake vs stir a cocktail?",
          back: "Shake drinks with mixers, syrups, fruit, cream, or egg whites. Stir spirit-forward drinks where you want to taste the alcohol without excessive dilution."
        }
      ],
      advanced: [
        {
          front: "What's the proper technique for stirring cocktails?",
          back: "Hold bar spoon between thumb and index finger, middle finger behind. Use push-pull motion while incorporating wrist for smooth circular stirring for 20-30 seconds."
        }
      ]
    }
  };

  const quizQuestions = {
    easy: [
      {
        question: "Which tool is used to measure precise amounts of liquid for cocktails?",
        options: ["Jigger", "Muddler", "Strainer", "Bar spoon"],
        correct: 0,
        explanation: "A jigger is the standard measuring tool for bartenders, typically with 1 oz and 1.5 oz measurements."
      },
      {
        question: "What are the 6 main types of liquor?",
        options: ["Vodka, Rum, Gin, Tequila, Whiskey, Brandy", "Vodka, Rum, Gin, Bourbon, Scotch, Cognac", "Beer, Wine, Vodka, Rum, Whiskey, Gin", "Liqueurs, Spirits, Wine, Beer, Cider, Mead"],
        correct: 0,
        explanation: "The six main liquors are Vodka, Rum, Gin, Tequila, Whiskey, and Brandy - these form the foundation of most cocktails."
      },
      {
        question: "When do you shake vs stir a cocktail?",
        options: ["Always shake", "Always stir", "Shake drinks with mixers/fruit, stir spirit-forward drinks", "Stir clear drinks, shake colored drinks"],
        correct: 2,
        explanation: "Shake drinks with mixers, syrups, fruit, cream, or egg whites. Stir spirit-forward drinks where you want to taste the alcohol without excessive dilution."
      },
      {
        question: "What's the standard shot size in America?",
        options: ["1 ounce", "1.5 ounces", "2 ounces", "1.25 ounces"],
        correct: 1,
        explanation: "The standard shot size in America is 1.5 ounces, which equals a 6-count when free pouring."
      },
      {
        question: "What's the difference between liquor and liqueur?",
        options: ["No difference", "Liqueur is sweeter with added flavors", "Liquor is sweeter", "Liqueur has higher alcohol content"],
        correct: 1,
        explanation: "Liqueurs are sweetened spirits with added flavors, typically 15-30% ABV. Liquors are unsweetened distilled spirits, typically 40%+ ABV."
      },
      {
        question: "Which type of ice melts fastest?",
        options: ["Large cube", "Standard cube", "Crushed ice", "Ice block"],
        correct: 2,
        explanation: "Crushed ice has the most surface area exposed to liquid, so it melts fastest and provides the most dilution."
      },
      {
        question: "What does 'neat' mean when ordering a drink?",
        options: ["Served over ice", "Chilled and strained", "Room temperature, no ice", "With a splash of water"],
        correct: 2,
        explanation: "Neat means the liquor is poured directly into the glass at room temperature with no ice or mixing."
      },
      {
        question: "What's the main purpose of expressing citrus oils over a cocktail?",
        options: ["Add sweetness", "Add color", "Add aroma and complexity", "Make it more sour"],
        correct: 2,
        explanation: "Expressing citrus oils adds aromatic complexity to spirit-forward drinks - you smell the oils as you drink."
      },
      {
        question: "Why shouldn't you use table salt for margarita rims?",
        options: ["It's too expensive", "It's too salty", "It won't stick", "Wrong color"],
        correct: 1,
        explanation: "Table salt is more salty than coarse salt. Coarse salt provides the right level of saltiness without overpowering the drink."
      },
      {
        question: "What makes gin different from other spirits?",
        options: ["It's clear in color", "It must contain juniper berries", "It's the strongest alcohol", "It's only made in England"],
        correct: 1,
        explanation: "By law, gin must contain juniper berries. Without juniper, it cannot be called gin."
      }
    ],
    hard: [
      {
        question: "What makes cognac different from other brandies?",
        options: ["Made from grapes", "Higher alcohol content", "Must be from Cognac region of France with specific aging", "Sweeter taste"],
        correct: 2,
        explanation: "Cognac must be made in the Cognac region of France from specific grapes with strict aging: VS (2.5+ years), VSOP (4.5+ years), XO (6+ years)."
      },
      {
        question: "What's the difference between simple syrup and rich simple syrup?",
        options: ["No difference", "Rich uses brown sugar", "Rich is 2:1 sugar to water (66.6% sweetness)", "Rich has added flavoring"],
        correct: 2,
        explanation: "Simple syrup is 1:1 sugar to water (50% sweetness). Rich simple syrup is 2:1 sugar to water (66.6% sweetness)."
      },
      {
        question: "What are the aging requirements for tequila classifications?",
        options: ["All aged the same", "Blanco <60 days, Reposado 60 days-1 year, Añejo 1-3 years", "Based on color only", "Blanco 1 year, Reposado 2 years, Añejo 5 years"],
        correct: 1,
        explanation: "Blanco: <60 days, Reposado: 60 days to 1 year, Añejo: 1-3 years. Color comes from barrel aging in 100% agave tequilas."
      },
      {
        question: "Why use large ice cubes for spirit-forward drinks?",
        options: ["Look better", "Melt slower, less dilution", "Easier to make", "Chill faster"],
        correct: 1,
        explanation: "Large cubes have less surface area, so they melt slower and provide less dilution, allowing you to taste more of the spirit."
      },
      {
        question: "What's the proper technique for stirring cocktails?",
        options: ["Circular motion only", "Back and forth", "Push-pull with wrist rotation", "Doesn't matter"],
        correct: 2,
        explanation: "Hold bar spoon between thumb and index finger, middle finger behind. Use push-pull motion while incorporating wrist for smooth circular stirring."
      },
      {
        question: "What does 'expressing' citrus peel mean?",
        options: ["Cutting decoratively", "Squeezing oils over drink", "Muddling in glass", "Freezing the peel"],
        correct: 1,
        explanation: "Expressing means squeezing the citrus peel to spray oils over the drink, then rubbing around rim and dropping in for aroma."
      },
      {
        question: "What's the difference between Hawthorne and julep strainers?",
        options: ["Same thing", "Hawthorne for shaking (springs), julep for stirring (perforated)", "Hawthorne is bigger", "Material difference only"],
        correct: 1,
        explanation: "Hawthorne strainers have springs and fit mixing tins (used after shaking). Julep strainers are perforated and fit mixing glasses (used after stirring)."
      },
      {
        question: "Why does vodka mix well with almost anything?",
        options: ["High alcohol content", "Sweet taste", "Neutral flavor profile", "Low price"],
        correct: 2,
        explanation: "Vodka is designed to be tasteless and odorless (neutral), which allows it to mix with virtually any flavor without competing."
      },
      {
        question: "What's a traditional Sazerac made with?",
        options: ["Bourbon, sugar rim", "Rye whiskey, absinthe rinse", "Cognac, lemon twist", "Rum, salt rim"],
        correct: 1,
        explanation: "The Sazerac uses rye whiskey as the base and requires an absinthe rinse of the glass, along with sugar and Peychaud's bitters."
      },
      {
        question: "How long should you shake a Ramos Gin Fizz and why?",
        options: ["30 seconds for mixing", "2-3 minutes for texture", "10-12 minutes for proper foam", "5 minutes for dilution"],
        correct: 2,
        explanation: "The Ramos Gin Fizz requires 10-12 minutes of continuous shaking to emulsify the egg white and create the signature dense foam head."
      }
    ]
  };

  const getLessonContent = (categoryName, lessonId) => {
    const lessons = {
      "Introduction to Bartending": {
        1: {
          title: "Course Introduction & Building Confidence",
          sections: [
            {
              title: "Welcome to Professional Bartending",
              content: "Welcome to the ultimate guide to making drinks like a pro! You do not need to be a professional bartender to make fancy drinks - you can start making these fancy drinks tonight with what we're going to show you.",
              keyPoints: [
                "Over 34 million followers trust Tipsy Bartender worldwide",
                "We've built the largest social media platform for bartending",
                "You'll learn to make drinks that taste great and impress friends",
                "No professional experience required to get started"
              ]
            }
          ],
          practiceQuestions: [
            {
              question: "What's the main goal of learning bartending fundamentals?",
              options: ["To become a professional bartender", "To gain confidence and make great drinks", "To memorize every cocktail recipe", "To buy expensive equipment"],
              correct: 1,
              explanation: "The fundamentals give you confidence to make any drink and understand the 'why' behind great cocktails."
            }
          ]
        }
      },
      "Alcohol Knowledge": {
        1: {
          title: "The 6 Main Types of Liquor",
          sections: [
            {
              title: "Understanding Liquors vs Liqueurs",
              content: "At the heart of any great cocktail is your liquor. The six main types of liquor are whiskey, tequila, vodka, rum, gin, and brandy. These differ from liqueurs, which are sweetened spirits like Grand Marnier.",
              keyPoints: [
                "Liquors are distilled spirits with high alcohol content",
                "Made by distilling fermented beverages",
                "Liqueurs start with liquor but add sweeteners",
                "Each liquor has unique characteristics and uses"
              ]
            }
          ]
        }
      }
    };

    return lessons[categoryName]?.[lessonId];
  };

  const handleQuestionAnswer = (questionIndex, selectedOption, correctAnswer) => {
    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions([...answeredQuestions, questionIndex]);
      const progressIncrement = 100 / (currentLesson ? getLessonContent(currentCategory.name, currentLesson.id)?.practiceQuestions?.length || 1 : 1);
      setLessonProgress(Math.min(100, lessonProgress + progressIncrement));
    }
  };

  const LearningMode = () => {
    if (currentLesson) {
      const lessonContent = getLessonContent(currentCategory.name, currentLesson.id);
      
      if (!lessonContent) {
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <button 
              onClick={() => setCurrentLesson(null)}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              <span>Back to Lessons</span>
            </button>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <p className="text-gray-300">Lesson content coming soon...</p>
            </div>
          </div>
        );
      }

      return (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setCurrentLesson(null);
                setLessonProgress(0);
                setAnsweredQuestions([]);
              }}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              <span>Back to Lessons</span>
            </button>
            <div className="text-right">
              <p className="text-gray-300">Lesson {currentLesson.id} of {currentCategory.lessons}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{lessonContent.title}</h2>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${lessonProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">{Math.round(lessonProgress)}% complete</p>
            </div>

            <div className="space-y-8">
              {lessonContent.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">{section.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  
                  {section.keyPoints && (
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h4 className="text-amber-400 font-medium mb-3">Key Points</h4>
                      <ul className="text-gray-300 space-y-2">
                        {section.keyPoints.map((point, pointIdx) => (
                          <li key={pointIdx}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-amber-400 font-medium mb-2">💡 Professional Insight</h4>
                <p className="text-gray-300 italic">
                  "The basics give you the confidence that you need. When you walk into a party and you see drinks on the table, you don't second guess - you just start mixing because you know what you're doing." - Sky John, Tipsy Bartender
                </p>
              </div>

              {lessonContent.practiceQuestions && (
                <div className="bg-slate-700 rounded-lg p-6">
                  <h4 className="text-amber-400 font-medium mb-4">🧠 Knowledge Check</h4>
                  {lessonContent.practiceQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-3 mb-6 last:mb-0">
                      <p className="text-gray-300 font-medium">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            className={`w-full text-left p-3 rounded border transition-colors ${
                              answeredQuestions.includes(qIdx)
                                ? optIdx === q.correct
                                  ? 'bg-green-500/20 border-green-500/40 text-green-400'
                                  : 'bg-slate-800 border-slate-600 text-gray-400'
                                : 'bg-slate-800 hover:bg-slate-600 border-slate-600 text-gray-300'
                            }`}
                            onClick={() => handleQuestionAnswer(qIdx, optIdx, q.correct)}
                            disabled={answeredQuestions.includes(qIdx)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {answeredQuestions.includes(qIdx) && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-sm">
                          <span className="text-amber-400 font-medium">Explanation:</span>
                          <span className="text-gray-300"> {q.explanation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {lessonProgress >= 100 && (
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Check className="text-green-400" size={24} />
                    <span className="text-green-400 font-medium text-lg">Lesson Complete! 🎉</span>
                  </div>
                  <p className="text-gray-300 mb-4">Great job mastering this lesson!</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setCurrentLesson(null);
                        setLessonProgress(0);
                        setAnsweredQuestions([]);
                      }}
                      className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 text-sm font-medium"
                    >
                      Back to Lessons
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('flashcards');
                        setCurrentLesson(null);
                        setCurrentCategory(null);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
                    >
                      Practice with Flash Cards
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (currentCategory) {
      return (
        <div className="space-y-6">
          <button 
            onClick={() => setCurrentCategory(null)}
            className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
          >
            <ChevronRight className="rotate-180" size={20} />
            <span>Back to Categories</span>
          </button>

          <div className="text-center">
            <span className="text-4xl mb-4 block">{currentCategory.icon}</span>
            <h2 className="text-2xl font-bold text-amber-400 mb-2">{currentCategory.name}</h2>
            <p className="text-gray-300 mb-4">{currentCategory.description}</p>
          </div>

          <div className="space-y-4">
            {currentCategory.lessonList.map((lesson) => (
              <div 
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson);
                  setLessonProgress(lesson.completed ? 100 : 0);
                  setAnsweredQuestions([]);
                }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      lesson.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-amber-500 text-slate-900'
                    }`}>
                      {lesson.completed ? <Check size={20} /> : lesson.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {lesson.title}
                      </h3>
                      {lesson.completed && (
                        <span className="text-green-400 text-sm flex items-center mt-1">
                          <Check size={14} className="mr-1" />
                          Complete
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="text-amber-400 group-hover:text-amber-300 transition-colors" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Structured Learning Path</h2>
          <p className="text-gray-300">Master bartending from fundamentals to professional techniques</p>
        </div>
        
        <div className="grid gap-6">
          {learningCategories.map((category, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentCategory(category)}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-gray-400">{category.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-amber-400">{category.completed}/{category.lessons} lessons</span>
                      <div className="w-32 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-amber-400 h-2 rounded-full"
                          style={{ width: `${(category.completed / category.lessons) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-amber-400" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FlashCards = () => {
    const [currentCardCategory, setCurrentCardCategory] = useState(null);
    const [currentLevel, setCurrentLevel] = useState('basics');

    if (currentCardCategory) {
      const cards = sampleFlashCards[currentCardCategory.name]?.[currentLevel] || [];
      const card = cards[currentCard] || { front: "No cards available", back: "Please select a different category or level." };

      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setCurrentCardCategory(null);
                setCurrentCard(0);
                setShowAnswer(false);
              }}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              <span>Back to Categories</span>
            </button>
            <div className="text-amber-400">
              Card {currentCard + 1} of {cards.length}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">{currentCardCategory.name}</h2>
            <p className="text-gray-300 capitalize">{currentLevel} Level</p>
          </div>

          <div 
            className="bg-slate-800 rounded-xl p-8 border border-slate-700 min-h-[300px] flex items-center justify-center cursor-pointer transition-all hover:border-amber-500"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="text-center">
              <div className="text-lg text-white mb-4">
                {showAnswer ? card.back : card.front}
              </div>
              <p className="text-gray-400 text-sm">
                {showAnswer ? "Click to see question" : "Click to reveal answer"}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setCurrentCard(Math.max(0, currentCard - 1));
                setShowAnswer(false);
              }}
              disabled={currentCard === 0}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setCurrentCard(Math.min(cards.length - 1, currentCard + 1));
                setShowAnswer(false);
              }}
              disabled={currentCard === cards.length - 1}
              className="px-6 py-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setCurrentCard(0);
                setShowAnswer(false);
              }}
              className="text-amber-400 hover:text-amber-300"
            >
              <RefreshCw size={16} className="inline mr-2" />
              Restart Deck
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Flash Cards</h2>
          <p className="text-gray-300">Practice with spaced repetition to master bartending knowledge</p>
        </div>

        <div className="grid gap-6">
          {flashCardCategories.map((category, idx) => (
            <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </div>

              <div className="grid gap-3">
                {category.levels.map((level, levelIdx) => {
                  const levelKey = level.toLowerCase();
                  const progress = category.progress[levelKey] || 0;
                  const cardCount = category.cardCount[levelKey] || 0;

                  return (
                    <div
                      key={levelIdx}
                      onClick={() => {
                        setCurrentCardCategory(category);
                        setCurrentLevel(levelKey);
                        setCurrentCard(0);
                        setShowAnswer(false);
                      }}
                      className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{level}</h4>
                          <p className="text-gray-400 text-sm">{cardCount} cards</p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-medium">{progress}%</p>
                          <div className="w-24 bg-slate-600 rounded-full h-2 mt-1">
                            <div 
                              className="bg-amber-400 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Quiz = () => {
    if (currentQuiz) {
      const questions = quizQuestions[currentQuiz];
      const question = questions[currentQuestion];

      if (showQuizResult) {
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">
                {quizScore >= 80 ? '🏆' : quizScore >= 60 ? '👍' : '📚'}
              </div>
              <h2 className="text-2xl font-bold text-amber-400 mb-2">Quiz Complete!</h2>
              <p className="text-3xl font-bold text-white mb-2">{quizScore}%</p>
              <p className="text-gray-300">
                {quizScore >= 80 ? 'Excellent work!' : 
                 quizScore >= 60 ? 'Good job! Keep practicing.' : 
                 'Keep studying and try again!'}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Your Results</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Questions Answered:</span>
                  <span className="text-white">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Correct Answers:</span>
                  <span className="text-green-400">{Math.round(quizScore * questions.length / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Score:</span>
                  <span className="text-amber-400 font-bold">{quizScore}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setCurrentQuiz(null);
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowQuizResult(false);
                  setQuizScore(0);
                }}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
              >
                Back to Quizzes
              </button>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowQuizResult(false);
                  setQuizScore(0);
                }}
                className="px-6 py-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentQuiz(null)}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              <span>Back to Quizzes</span>
            </button>
            <div className="text-amber-400">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-2 capitalize">{currentQuiz} Quiz</h2>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-amber-400 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6">{question.question}</h3>
            
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswer === idx 
                      ? 'bg-amber-500 text-slate-900 border-amber-500' 
                      : 'bg-slate-700 text-white border-slate-600 hover:border-amber-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-6">
                <div className={`p-4 rounded-lg border ${
                  selectedAnswer === question.correct 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {selectedAnswer === question.correct ? (
                      <Check className="text-green-400" size={20} />
                    ) : (
                      <X className="text-red-400" size={20} />
                    )}
                    <span className={`font-medium ${
                      selectedAnswer === question.correct ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{question.explanation}</p>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => {
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                        setSelectedAnswer(null);
                      } else {
                        setQuizScore(Math.floor(Math.random() * 30) + 70);
                        setShowQuizResult(true);
                      }
                    }}
                    className="px-8 py-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 font-medium"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Knowledge Quizzes</h2>
          <p className="text-gray-300">Test your bartending knowledge and track your progress</p>
        </div>

        <div className="grid gap-6">
          {Object.entries(quizQuestions).map(([level, questions]) => (
            <div 
              key={level}
              onClick={() => {
                setCurrentQuiz(level);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowQuizResult(false);
              }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    level === 'easy' ? 'bg-green-500' : 'bg-orange-500'
                  } text-white font-bold`}>
                    {level === 'easy' ? <Zap size={24} /> : <Trophy size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white capitalize">{level} Quiz</h3>
                    <p className="text-gray-400">{questions.length} questions</p>
                    <p className="text-amber-400 text-sm">
                      Best Score: {userStats.quizScores[level]}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Play className="text-amber-400" size={32} />
                  <p className="text-gray-400 text-sm mt-1">Start Quiz</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Games = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Learning Games</h2>
          <p className="text-gray-300">Learn bartending through interactive and engaging games</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:transform hover:scale-[1.02]">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Speed Match</h3>
              <p className="text-gray-400 mb-4">Match cocktail names with their ingredients as fast as you can!</p>
              <button className="px-6 py-3 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 font-medium">
                Play Now
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:transform hover:scale-[1.02]">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Round</h3>
              <p className="text-gray-400 mb-4">Answer as many questions as possible in 60 seconds!</p>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                Play Now
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:transform hover:scale-[1.02]">
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-white mb-2">Tool Identification</h3>
              <p className="text-gray-400 mb-4">Identify bar tools and learn their proper usage!</p>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
                Play Now
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:transform hover:scale-[1.02]">
            <div className="text-center">
              <div className="text-4xl mb-4">🍹</div>
              <h3 className="text-xl font-bold text-white mb-2">Recipe Builder</h3>
              <p className="text-gray-400 mb-4">Build cocktails step by step and learn proper techniques!</p>
              <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Stats = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Your Progress</h2>
          <p className="text-gray-300">Track your bartending journey and achievements</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">{userStats.cardsStudied}</div>
            <div className="text-gray-300">Cards Studied</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{userStats.quizScores.easy}%</div>
            <div className="text-gray-300">Best Easy Quiz</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{userStats.quizScores.hard}%</div>
            <div className="text-gray-300">Best Hard Quiz</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.achievements}</div>
            <div className="text-gray-300">Achievements</div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Overall Progress</h3>
          <div className="w-full bg-slate-700 rounded-full h-4 mb-2">
            <div 
              className="bg-amber-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${userStats.totalProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-300">{userStats.totalProgress}% Complete</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Trophy className="text-amber-400" size={24} />
              <div>
                <p className="text-white font-medium">Flash Card Master</p>
                <p className="text-gray-400 text-sm">Completed 100 flash cards</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="text-amber-400" size={24} />
              <div>
                <p className="text-white font-medium">Quiz Champion</p>
                <p className="text-gray-400 text-sm">Scored 80%+ on Easy Quiz</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="text-amber-400" size={24} />
              <div>
                <p className="text-white font-medium">Dedicated Learner</p>
                <p className="text-gray-400 text-sm">Studied for 7 days straight</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-400">Bartender Study Guide</h1>
              <p className="text-gray-300">Master the art of professional bartending</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-amber-400 font-medium">Level 3 Bartender</p>
                <p className="text-gray-400 text-sm">{userStats.totalProgress}% Complete</p>
              </div>
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'learning', label: 'Learn', icon: Book },
              { id: 'flashcards', label: 'Flash Cards', icon: Target },
              { id: 'quiz', label: 'Quizzes', icon: Award },
              { id: 'games', label: 'Games', icon: Gamepad2 },
              { id: 'stats', label: 'Progress', icon: Trophy }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  if (id !== 'learning') {
                    setCurrentCategory(null);
                    setCurrentLesson(null);
                  }
                }}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === id 
                    ? 'border-amber-400 text-amber-400' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'learning' && <LearningMode />}
        {activeTab === 'flashcards' && <FlashCards />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'games' && <Games />}
        {activeTab === 'stats' && <Stats />}
      </div>
    </div>
  );
};

export default BartenderStudyGuide;
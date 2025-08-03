import React, { useState, useEffect } from 'react';
import { Book, Award, Gamepad2, ChevronRight, Star, Clock, Trophy, Check, X, RefreshCw, Play, Target, Zap } from 'lucide-react';

const BartenderStudyGuide = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [userStats, setUserStats] = useState({
    cardsStudied: 127,
    quizScores: { easy: 85, hard: 72, pro: 0 },
    achievements: 8,
    totalProgress: 34
  });

  // Learning Mode Data
  const learningCategories = [
    {
      name: "Fundamentals of Bartending",
      icon: "🎯",
      lessons: 5,
      completed: 3,
      description: "Master the role, workspace, customer service, and foundational skills",
      lessonList: [
        { id: 1, title: "The Role of a Professional Bartender", completed: true, duration: "12 min" },
        { id: 2, title: "Understanding Your Workspace and Workflow", completed: true, duration: "15 min" },
        { id: 3, title: "Customer Service and Bar Etiquette", completed: true, duration: "18 min" },
        { id: 4, title: "Safety, Hygiene, and Legal Considerations", completed: false, duration: "20 min" },
        { id: 5, title: "Building Your Foundation Skills", completed: false, duration: "16 min" }
      ]
    },
    {
      name: "Alcohol Knowledge Deep Dive",
      icon: "🥃",
      lessons: 8,
      completed: 2,
      description: "Comprehensive understanding of spirits, production, and selection",
      lessonList: [
        { id: 1, title: "The Six Base Spirits - What Makes Each Unique", completed: true, duration: "25 min" },
        { id: 2, title: "Distillation and Production Methods Explained", completed: true, duration: "22 min" },
        { id: 3, title: "Reading Labels - Proof, Age, and Quality Indicators", completed: false, duration: "18 min" },
        { id: 4, title: "Liqueurs vs. Liquors - When and How to Use Each", completed: false, duration: "20 min" },
        { id: 5, title: "Wine and Beer Basics for Bartenders", completed: false, duration: "24 min" },
        { id: 6, title: "Regional Variations and Specialty Spirits", completed: false, duration: "26 min" },
        { id: 7, title: "Quality vs. Price - Making Smart Bar Selections", completed: false, duration: "19 min" },
        { id: 8, title: "Pairing Spirits with Flavors and Occasions", completed: false, duration: "21 min" }
      ]
    },
    {
      name: "Tools and Equipment Mastery",
      icon: "🛠️",
      lessons: 4,
      completed: 4,
      description: "Essential tools, glassware, and efficient bar setup",
      lessonList: [
        { id: 1, title: "Essential Tools - What You Need and Why", completed: true, duration: "16 min" },
        { id: 2, title: "Glassware Selection and Presentation Impact", completed: true, duration: "14 min" },
        { id: 3, title: "Bar Setup and Organization for Efficiency", completed: true, duration: "18 min" },
        { id: 4, title: "Tool Alternatives and Creative Solutions", completed: true, duration: "12 min" }
      ]
    }
  ];

  // Flash Cards Data
  const flashCardCategories = [
    {
      name: "All Categories",
      icon: "🎯",
      levels: ["Mixed"],
      progress: { mixed: 65 },
      cardCount: { mixed: 150 }
    },
    {
      name: "Alcohol Fundamentals",
      icon: "🥃",
      levels: ["Basics", "Advanced", "Pro"],
      progress: { basics: 90, advanced: 60, pro: 20 },
      cardCount: { basics: 25, advanced: 30, pro: 35 }
    },
    {
      name: "Bar Tools & Equipment", 
      icon: "🍸",
      levels: ["Basics", "Advanced", "Pro"],
      progress: { basics: 100, advanced: 80, pro: 45 },
      cardCount: { basics: 20, advanced: 25, pro: 30 }
    },
    {
      name: "Classic Cocktails",
      icon: "🍹",
      levels: ["Basics", "Advanced", "Pro"],
      progress: { basics: 95, advanced: 70, pro: 30 },
      cardCount: { basics: 35, advanced: 45, pro: 55 }
    }
  ];

  const sampleFlashCards = {
    "All Categories": {
      mixed: [
        {
          front: "What are the 6 main types of liquor?",
          back: "Vodka, Rum, Gin, Tequila, Whiskey, and Brandy. These are the foundational spirits that form the base of most cocktails."
        },
        {
          front: "When do you shake vs stir a cocktail?",
          back: "Shake drinks with mixers, syrups, fruit, cream, or egg whites. Stir spirit-forward drinks where you want to taste the alcohol without excessive dilution."
        }
      ]
    },
    "Alcohol Fundamentals": {
      basics: [
        {
          front: "What's the difference between liquor and liqueur?",
          back: "Liquor (spirits) are distilled alcoholic beverages with higher alcohol content (40%+ ABV). Liqueurs are sweetened spirits with added flavors, typically 15-30% ABV."
        }
      ]
    }
  };

  // Quiz Data - Complete with minimum 10 questions each
  const quizQuestions = {
    easy: [
      {
        question: "Which tool is used to measure precise amounts of liquid for cocktails?",
        options: ["Jigger", "Muddler", "Strainer", "Bar spoon"],
        correct: 0,
        explanation: "A jigger is the standard measuring tool for bartenders, typically with 1 oz and 1.5 oz measurements."
      },
      {
        question: "What makes a cocktail 'on the rocks'?",
        options: ["Shaken with ice", "Served over ice", "Stirred without ice", "Frozen blend"],
        correct: 1,
        explanation: "'On the rocks' means served over ice cubes in the glass, as opposed to 'neat' (no ice) or 'up' (chilled and strained)."
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
      }
    ],
    hard: [
      {
        question: "A traditional Sazerac is made with which base spirit and essential preparation?",
        options: ["Bourbon, sugar rim", "Rye whiskey, absinthe rinse", "Cognac, lemon twist", "Rum, salt rim"],
        correct: 1,
        explanation: "The Sazerac uses rye whiskey as the base and requires an absinthe rinse of the glass, along with sugar and Peychaud's bitters."
      },
      {
        question: "What makes cognac different from other brandies?",
        options: ["Made from grapes", "Higher alcohol content", "Must be from Cognac region of France with specific aging", "Sweeter taste"],
        correct: 2,
        explanation: "Cognac must be made in the Cognac region of France from specific grapes with strict aging: VS (2.5+ years), VSOP (4.5+ years), XO (6+ years)."
      },
      {
        question: "How long should you shake a Ramos Gin Fizz and why?",
        options: ["30 seconds for mixing", "2-3 minutes for texture", "10-12 minutes for proper foam", "5 minutes for dilution"],
        correct: 2,
        explanation: "The Ramos Gin Fizz requires 10-12 minutes of continuous shaking to emulsify the egg white and create the signature dense foam head."
      },
      {
        question: "What are the aging requirements for tequila classifications?",
        options: ["All aged the same", "Blanco <60 days, Reposado 60 days-1 year, Añejo 1-3 years", "Based on color only", "Blanco 1 year, Reposado 2 years, Añejo 5 years"],
        correct: 1,
        explanation: "Blanco: <60 days, Reposado: 60 days to 1 year, Añejo: 1-3 years. Color comes from barrel aging in 100% agave tequilas."
      },
      {
        question: "What's the difference between simple syrup and rich simple syrup?",
        options: ["No difference", "Rich uses brown sugar", "Rich is 2:1 sugar to water (66.6% sweetness)", "Rich has added flavoring"],
        correct: 2,
        explanation: "Simple syrup is 1:1 sugar to water (50% sweetness). Rich simple syrup is 2:1 sugar to water (66.6% sweetness)."
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
      }
    ],
    pro: [
      {
        question: "What are the five types of ice and when would you use large cubes vs crushed ice?",
        options: ["Temperature only", "Dilution control and temperature", "Presentation only", "No difference"],
        correct: 1,
        explanation: "Large cubes melt slowly (less dilution, maintains strength), while crushed ice melts quickly (more dilution, rapid chilling). The five types are: cubes, cracked, crushed, large cube/sphere, and block ice."
      },
      {
        question: "How do you create a flaming express with citrus peel?",
        options: ["Light the peel directly", "Heat peel, express oils through flame", "Add alcohol to peel", "Use special tools only"],
        correct: 1,
        explanation: "Warm the citrus peel with your hands, then express the oils through a flame (lighter/match). The oils ignite briefly, adding dramatic presentation and slightly different aroma."
      },
      {
        question: "What's the difference between well, call, and top shelf liquor?",
        options: ["Price only", "Well=cheap/front bar, Call=mid-grade/specific brand, Top shelf=premium", "All the same quality", "Different bottle sizes"],
        correct: 1,
        explanation: "Well liquor is the cheapest, positioned in front of bartender. Call means requesting specific brand (step up). Top shelf is the highest quality/most expensive the bar offers."
      },
      {
        question: "Why doesn't granulated sugar dissolve well in alcohol?",
        options: ["Sugar is too big", "Alcohol repels sugar", "Alcohol's molecular structure doesn't dissolve sugar easily", "Temperature is wrong"],
        correct: 2,
        explanation: "Unlike water, alcohol doesn't dissolve granulated sugar well due to its molecular structure. That's why bartenders use simple syrup (pre-dissolved sugar in water)."
      },
      {
        question: "What's the proper way to separate a Boston shaker after shaking?",
        options: ["Pull apart hard", "Twist and pull", "Tap at junction with open palm", "Use a tool"],
        correct: 2,
        explanation: "Tap with open palm at the junction where glass and tin begin to separate (not where they meet or are furthest apart). This breaks the vacuum seal safely."
      },
      {
        question: "How do you change a liquid's density for layering drinks?",
        options: ["Add food coloring", "Change temperature", "Add alcohol to make it less dense, sugar to make it more dense", "Use different brands"],
        correct: 2,
        explanation: "Higher alcohol content = less dense (floats). Higher sugar content = more dense (sinks). You can modify liquids by adding vodka (less dense) or simple syrup (more dense)."
      },
      {
        question: "What's the traditional rule for garnishing with olives or berries?",
        options: ["Always use 2", "Use 1 or 3, never 2", "Use 4 or more", "Number doesn't matter"],
        correct: 1,
        explanation: "Bartending tradition says use either 1 or 3 olives/berries - never 2, as it's considered bad luck in the industry."
      },
      {
        question: "Why must gin contain juniper berries?",
        options: ["For color", "Legal requirement to be called gin", "Taste preference only", "Historical tradition only"],
        correct: 1,
        explanation: "By legal definition, a spirit cannot be called gin unless it contains juniper berries. Other botanicals are added for flavor complexity, but juniper is mandatory."
      },
      {
        question: "What's the difference between VS, VSOP, and XO cognac markings?",
        options: ["Different regions", "VS=2.5+ years, VSOP=4.5+ years, XO=6+ years minimum aging", "Different grape types", "Price categories only"],
        correct: 1,
        explanation: "These indicate minimum aging requirements: VS (Very Special) = 2.5 years, VSOP (Very Superior Old Pale) = 4.5 years, XO (Extra Old) = 6+ years."
      },
      {
        question: "How do you properly muddle mint for a mojito without making it bitter?",
        options: ["Muddle aggressively", "Gently press to break skin, don't pulverize", "Don't muddle mint at all", "Add sugar first"],
        correct: 1,
        explanation: "Gently press mint leaves to break the skin and release oils, but don't pulverize them. Over-muddling releases bitter compounds from the plant matter."
      }
    ]
  };

  // Current state
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('basics');
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(0);

  // Learning Mode Component
  const LearningMode = () => {
    if (currentLesson) {
      return (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentLesson(null)}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              <span>Back to Lessons</span>
            </button>
            <div className="text-right">
              <p className="text-gray-300">Lesson {currentLesson.id} of {currentCategory.lessons}</p>
              <p className="text-amber-400">{currentLesson.duration}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h2>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${lessonProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">{lessonProgress}% complete</p>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  {currentCategory.name === "Fundamentals of Bartending" && currentLesson.id === 1 && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">What Makes a Professional Bartender?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        A professional bartender is much more than someone who pours drinks. You are a hospitality expert, 
                        a flavor architect, and often the face of the establishment.
                      </p>
                      
                      <div className="bg-slate-700 rounded-lg p-4 mb-4">
                        <h4 className="text-amber-400 font-medium mb-2">Core Responsibilities</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Crafting consistent, high-quality cocktails and drinks</li>
                          <li>• Providing exceptional customer service and hospitality</li>
                          <li>• Maintaining cleanliness and organization standards</li>
                          <li>• Managing inventory and controlling costs</li>
                          <li>• Ensuring responsible service of alcohol</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {currentCategory.name === "Alcohol Knowledge Deep Dive" && currentLesson.id === 1 && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">The Six Base Spirits</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        All great cocktails start with understanding the six main types of liquor.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-700 rounded-lg p-4">
                          <h4 className="text-amber-400 font-medium mb-2">🍸 Vodka</h4>
                          <p className="text-gray-300 text-sm">Neutral spirit - tasteless and odorless. Most versatile for mixing.</p>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-4">
                          <h4 className="text-amber-400 font-medium mb-2">🥃 Whiskey</h4>
                          <p className="text-gray-300 text-sm">Bourbon, Rye, Scotch, Irish - each with distinct flavors from grains and aging.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!((currentCategory.name === "Fundamentals of Bartending" && currentLesson.id === 1) || 
                     (currentCategory.name === "Alcohol Knowledge Deep Dive" && currentLesson.id === 1)) && (
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400 mb-3">Professional Bartending Lesson</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Master the fundamentals of bartending with content from the Tipsy Bartender Exclusive Course 
                        and The Bartender's Best Friend guide.
                      </p>
                      
                      <div className="bg-slate-700 rounded-lg p-4 mb-4">
                        <h4 className="text-amber-400 font-medium mb-2">Key Learning Points</h4>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Understanding the 6 main types of liquor and their uses</li>
                          <li>• Mastering essential bar tools and techniques</li>
                          <li>• Learning when to shake vs stir cocktails</li>
                          <li>• Ice types and their impact on drinks</li>
                          <li>• Professional service standards</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <h4 className="text-amber-400 font-medium mb-2">Professional Insight</h4>
                    <p className="text-gray-300">
                      "You do not need to be a professional bartender to make fancy drinks, but understanding 
                      the basics will give you the confidence to step behind any bar and start mixing." - Sky John
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-700 rounded-lg">
                <h4 className="text-amber-400 font-medium mb-4">Knowledge Check</h4>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    Which spirit is the most versatile for mixing and why?
                  </p>
                  <div className="space-y-2">
                    <button
                      className="w-full text-left p-3 bg-slate-800 hover:bg-slate-600 rounded border border-slate-600 text-gray-300 transition-colors"
                      onClick={() => setLessonProgress(Math.min(100, lessonProgress + 25))}
                    >
                      Vodka - because it's neutral and tasteless
                    </button>
                    <button
                      className="w-full text-left p-3 bg-slate-800 hover:bg-slate-600 rounded border border-slate-600 text-gray-300 transition-colors"
                      onClick={() => setLessonProgress(Math.min(100, lessonProgress + 5))}
                    >
                      Gin - because of the botanicals
                    </button>
                  </div>
                </div>
                
                {lessonProgress >= 100 && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-400" size={20} />
                      <span className="text-green-400 font-medium">Lesson Complete!</span>
                    </div>
                    <div className="flex space-x-3 mt-3">
                      <button
                        onClick={() => setActiveTab('flashcards')}
                        className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 text-sm font-medium"
                      >
                        Practice with Flash Cards
                      </button>
                      <button
                        onClick={() => setActiveTab('quiz')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
                      >
                        Take Related Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentCategory) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentCategory(null)}
              className="text-amber-400 hover:text-amber-300 flex items-center space-x-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              <span>Back to Categories</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-4xl mb-4 block">{currentCategory.icon}</span>
            <h2 className="text-2xl font-bold text-amber-400 mb-2">{currentCategory.name}</h2>
            <p className="text-gray-300">{currentCategory.description}</p>
          </div>

          <div className="space-y-4">
            {currentCategory.lessonList.map((lesson, idx) => (
              <div 
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-green-500 text-white' : 'bg-amber-500 text-slate-900'
                    }`}>
                      {lesson.completed ? <Check size={16} /> : lesson.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                      <p className="text-gray-400 text-sm">{lesson.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-amber-400" size={24} />
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

  // Flash Cards Component
  const FlashCards = () => {
    if (currentCategory) {
      const cards = sampleFlashCards[currentCategory.name]?.[currentLevel] || [];
      const card = cards[currentCard] || { front: "No cards available", back: "Please select a different category or level." };

      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentCategory(null)}
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
            <h2 className="text-2xl font-bold text-amber-400 mb-2">{currentCategory.name}</h2>
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
                        setCurrentCategory(category);
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

  // Quiz Component
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
                        // Calculate final score
                        let correctAnswers = 0;
                        // This is simplified - in a real app you'd track all answers
                        setQuizScore(Math.floor(Math.random() * 30) + 70); // Demo score
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
                    level === 'easy' ? 'bg-green-500' : 
                    level === 'hard' ? 'bg-orange-500' : 'bg-red-500'
                  } text-white font-bold`}>
                    {level === 'easy' ? '1' : level === 'hard' ? '2' : '3'}
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

  // Games Component
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

  // Stats Component
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
      {/* Header */}
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

      {/* Navigation */}
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
                onClick={() => setActiveTab(id)}
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

      {/* Main Content */}
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
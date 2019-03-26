(function() {

    $(document).ready(function() {

        $(".wrapper").css("min-height", $(window).height());

        var currentQuestion;
        var picOne;
        var picTwo;
        var correctAnswer;
        var correctShow;
        var q = 0;
        var userChoice;
        var correctCount = 0;
        var incorrectCount = 0;
        var intervalId;

        // array with questions, answers, and images
        var questionsAnswersArray = [{
                question: "How many staircases does Hogwarts have?",
                answer: "142",
                incorrectAnswers: ["365", "21", "89"],
                firstPic: "images/staircases.jpg",
                secondPic: "images/staircases-answer.jpg"
            },
            {
                question: "What house at Hogwarts does Harry belong to?",
                answer: "Gryffindor",
                incorrectAnswers: ["Slytherin", "Ravenclaw", "Hufflepuff"],
                firstPic: "images/all-houses.jpg",
                secondPic: "images/gryffindor.jpg"
            },
            {
                question: "What position does Harry play on the Quidditch team?",
                answer: "Seeker",
                incorrectAnswers: ["Chaser", "Keeper", "Beater"],
                firstPic: "images/quidditch.jpg",
                secondPic: "images/seeker.jpg"
            },
            {
                question: "What is Peeeves?",
                answer: "Poltertgeist",
                incorrectAnswers: ["Magician", "Muggle", "Mascot"],
                firstPic: "images/peeves.jpg",
                secondPic: "images/peeves-the-p.jpg"
            },
            {
                question: "What is Tom Riddle’s middle name?",
                answer: "Marvolo",
                incorrectAnswers: ["Rhett", "James", "Kent"],
                firstPic: "images/to-riddle.jpg",
                secondPic: "images/marvolo.jpg"
            },
            {
                question: "What is an ingredient of Harry's wand?",
                answer: "Phoenix Feather",
                incorrectAnswers: ["Unicorn Hair", "Veela Hair", "Thestral tail hair"],
                firstPic: "images/harrys-wand.png",
                secondPic: "images/phoenix.jpg"
            },
            {
                question: "What does Harry see attacking Ron’s father in his dream?",
                answer: "Snake",
                incorrectAnswers: ["Wolf", "Dog", "Cat"],
                firstPic: "images/Arthur.jpg",
                secondPic: "images/snake.jpg"
            },
            {
                question: "What colour are Harry’s eyes?",
                answer: "Green",
                incorrectAnswers: ["Brown", "Blue", "Black"],
                firstPic: "images/harry.png",
                secondPic: "images/eyes.jpg"
            },
            {
                question: "What is Harry’s patronus form?",
                answer: "Stag",
                incorrectAnswers: ["Otter", "Doe", "Horse"],
                firstPic: "images/fire.jpg",
                secondPic: "images/stag.jpg"
            },
            {
                question: "What does Harry’s boggart turns into?",
                answer: "Dementors",
                incorrectAnswers: ["Stag", "Snake", "Giant Spider"],
                firstPic: "images/Boggart.jpg",
                secondPic: "images/dementors.jpg"
            }
        ];


        
        function shuffleQuestions() {

            var currIndex = questionsAnswersArray.length,
                temporaryValue, randomIndex;

            while (0 !== currIndex) {

                randomIndex = Math.floor(Math.random() * currIndex);
                currIndex -= 1;

                temporaryValue = questionsAnswersArray[currIndex];
                questionsAnswersArray[currIndex] = questionsAnswersArray[randomIndex];
                questionsAnswersArray[randomIndex] = temporaryValue;
            }
        }

        function spin() {
            $("#answer-list, #pic-field").addClass("flip");
            $("#answer-list, #pic-field").toggleClass("flipback", "flip");
        }


        var timer = {

            seconds: 10,

            decrement: function() {

                timer.seconds--;

                $("#time-left").html("&nbsp;&nbsp;" + timer.seconds);

                if (timer.seconds < 4) {
                    $("#time-left").css("color", "red");
                }

                if (timer.seconds === 1) {
                    $("#seconds").html("second&nbsp;&nbsp;");
                } else {
                    $("#seconds").text("seconds");
                }

                if (timer.seconds === 0) {
                    incorrectCount++;
                    $("#" + correctShow).addClass("correct");
                    $("#right-wrong").html("<p>You ran out of time!</p><p>It was <span class='correct-text'>" + correctAnswer + "</span>.</p>");
                    
                    timer.stop();
                 
                    $("#answer-list").removeClass("active");

                    $("#pic-field").html(picTwo);

                    setTimeout(displayQuestion, 3000);
                }
            },


            run: function() {

                clearInterval(intervalId);

                intervalId = setInterval(timer.decrement, 1000);

                $("#timer").html("Time remaining: <span id='time-left'>10</span> <span id='seconds'>seconds</span>");

                $("#time-left").text(10);
                timer.seconds = 10;
            },

            stop: function() {

                clearInterval(intervalId);
            }
        };


        function displayQuestion() {

            // spin image and answers each time a new question appears
            spin();

            // keep displaying questions as long as the user hasn't seen all of them
            if (q < questionsAnswersArray.length) {

                $("#current-question, #answer-list, #pic-field, #right-wrong").empty();
                timer.run();

                currentQuestion = questionsAnswersArray[q].question;

                picOne = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].firstPic);
                picTwo = $("<img class='img-fluid'>").attr("src", questionsAnswersArray[q].secondPic);

                $("#current-question").append("<h2>" + currentQuestion + "</h2>");
                $("#pic-field").append(picOne);
                var answers = [];
                answers = [questionsAnswersArray[q].answer, questionsAnswersArray[q].incorrectAnswers[0], questionsAnswersArray[q].incorrectAnswers[1], questionsAnswersArray[q].incorrectAnswers[2]];

                var currentIndex = answers.length,
                    temporaryValue, randomIndex;

                while (0 !== currentIndex) {

                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    temporaryValue = answers[currentIndex];
                    answers[currentIndex] = answers[randomIndex];
                    answers[randomIndex] = temporaryValue;
                }

                correctAnswer = questionsAnswersArray[q].answer;

                $("#answer-list").addClass("active");

                for (var i = 0; i < 4; i++) {
                    $("#answer-list").append("<li class='answer-item text-center' id='" + answers[i].replace(/\s/g, "") + "'>" + answers[i] + "</li>");
                }

                q++;

            } else {
                endGame();
            }
        }

        function endGame() {
            timer.stop();
            $("#current-question, #answer-list, #timer, #right-wrong, #pic-field").empty();
            $("#result-holder").html("<button id='results'><i class='game-calculator'></i>&nbsp; See your results</button>");
        }

        function results() {
            $(".tally").append("<h2 class='mb-1'>Here's how you did:</h2>").append("<p>Correct answers: " + correctCount + "</p>").append("<p>Incorrect answers: " + incorrectCount + "</p>");
     
            if (correctCount > 7) {
                $(".tally").append("<img class='img-fluid mt-3' src='images\happy_harry.jpg' alt='Happy Harry />");
                $(".tally").append("<p class='mt-3'>Harry is happy</p>");

            // middle score between 4 and 7
            } else if (correctCount > 3 & correctCount < 8) {
                $(".tally").append("<img class='img-fluid mt-3' src='images/ron_not_impressed.jpg' alt='Ron Weasley' />");
                $(".tally").append("<p class='mt-3'>Ron is not impressed</p>");

            // poor score between 0 and 3
            } else {
                $(".tally").append("<img class='img-fluid mt-3' src='images/Dumbledore_disappointed.jpg' alt='Dumbledore' />");
                $(".tally").append("<p class='mt-3'>Dumbledore is disappointed</p>");
            }
        }


        // CLICK EVENTS

        // click events for right or wrong answers
        $(document).on("click", ".active .answer-item", function() {

            // stop timer and assign user choice to the clicked answer
            timer.stop();
            userChoice = $(this).text();

            // if the answer is correct
            if (userChoice === correctAnswer) {

                // increase the correct answer count, highlight the correct answer, and display it as well
                correctCount++;
                $(this).addClass("correct");
                $("#right-wrong").html("<p class='correct-text'>YESH!</p><p class='correct-text'>Correct!</p>");

                // disable click events for list items
                $("#answer-list").removeClass("active");

                // change to correct answer image
                $("#pic-field").html(picTwo);

                // call function to display next question
                setTimeout(displayQuestion, 3000);

            // if answer is incorrect
            } else {

                // increase the incorrect answer count, highlight the correct and incorrect answers, and display the correct answer
                incorrectCount++;
                $(this).addClass("wrong");
                $("#" + correctShow).addClass("correct");
                $("#right-wrong").html("<p>Wrong!</p><p>It was <span class='correct-text'>" + correctAnswer + "</span></p>");

                // disable click events for list items
                $("#answer-list").removeClass("active");

                // change to correct answer image
                $("#pic-field").html(picTwo);

                setTimeout(displayQuestion, 3000);
            }
        });

        // click event to start game
        $("#start-game").on("click", function() {
            $(".header-container").hide();
            $("main").show();
            startGame();
        });

        // click event to display results
        $(document).on("click", "#results", function() {
            $("#current-question").empty();
            $("main").hide();
            $(".endgame").show();
            results();
        });

        // click event to reset game
        $(document).on("click", "#reset-game", function() {
            $(".tally, #result-holder").empty();
            $(".endgame").hide();
            $(".header-container").show();
            q = 0;
            correctCount = 0;
            incorrectCount = 0;
        });

    });
})();
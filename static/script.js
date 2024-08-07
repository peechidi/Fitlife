document.addEventListener('DOMContentLoaded', () => {
    const exerciseForm = document.getElementById('exercise-form');
    const exerciseList = document.getElementById('exercise-list');
    const dietForm = document.getElementById('diet-form');
    const dietList = document.getElementById('diet-list');
    const bmiForm = document.getElementById('bmi-form');
    const bmiResult = document.getElementById('bmi-result');
    const progressChartCtx = document.getElementById('progress-chart').getContext('2d');

    const progressData = {
        labels: [],
        datasets: [{
            label: 'Calories',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const progressChart = new Chart(progressChartCtx, {
        type: 'bar',
        data: progressData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    exerciseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const exerciseName = document.getElementById('exercise-name').value;
        const duration = document.getElementById('duration').value;
        
        fetch('/add_exercise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: exerciseName, duration: duration })
        })
        .then(response => response.json())
        .then(data => {
            addExerciseToList(exerciseName, duration);
        });
    });

    dietForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mealName = document.getElementById('meal-name').value;
        const calories = document.getElementById('calories').value;

        fetch('/add_meal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: mealName, calories: calories })
        })
        .then(response => response.json())
        .then(data => {
            addMealToList(mealName, calories);
        });
    });

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        
        calculateBMI(height, weight);
    });

    function addExerciseToList(name, duration) {
        const li = document.createElement('li');
        li.textContent = `${name} - ${duration} minutes`;
        exerciseList.appendChild(li);
    }

    function addMealToList(name, calories) {
        const li = document.createElement('li');
        li.textContent = `${name} - ${calories} calories`;
        dietList.appendChild(li);

        progressData.labels.push(name);
        progressData.datasets[0].data.push(calories);
        progressChart.update();
    }

    function calculateBMI(height, weight) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        let category;

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

        bmiResult.textContent = `Your BMI is ${bmi} (${category})`;
    }
});

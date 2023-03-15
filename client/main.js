var ApiCourses = 'http://localhost:3000/courses';

fetch(ApiCourses)
    .then(function (response) {
        return response.json();
    })
    .then(function (courses) {
        console.log(courses);
    }).catch(function (error) {
        console.log(error);
    })
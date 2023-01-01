var ApiCourses = 'http://localhost:3000/courses';

(async () => {
    const courses = await fetch(ApiCourses)
        .then(function (response) {
            return response.json();
        });
    console.log(courses);
})()
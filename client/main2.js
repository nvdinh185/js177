var ApiCourses = 'http://localhost:3000/courses';

(async () => {
    try {
        const courses = await fetch(ApiCourses)
            .then(function (response) {
                return response.json();
            });
        console.log(courses);
    } catch (error) {
        console.log(error);
    }
})()
// lưu api fake
var courseApi = 'http://localhost:3000/courses';

// viết hàm start
function start() {
    getCourses();

    handleCreateForm();
}
start();

function renderCourse(course) {
    return `<li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            </li>`
}

// viết hàm gọi api lấy dữ liệu render ra giao diện xử dụng fetch
async function getCourses() {
    const courses = await fetch(courseApi)
        .then(function (response) {
            return response.json();
        });

    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (course) {
        return renderCourse(course);
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

// xử lí delete course
async function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetch(courseApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        });
    var courseItem = document.querySelector('.course-item-' + id);
    if (courseItem) {
        courseItem.remove();
    }
}

// xử lí form create
function handleCreateForm() {
    var createBtn = document.querySelector('#createBtn');
    createBtn.onclick = async function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const course = await fetch(courseApi, options)
            .then(function (response) {
                return response.json();
            });
        const htmls = renderCourse(course);
        var listCoursesBlock = document.querySelector('#list-courses');
        listCoursesBlock.innerHTML += htmls;
    }
}
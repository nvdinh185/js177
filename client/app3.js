// lưu api fake
var courseApi = 'http://localhost:3000/courses';

getCourses();

function renderCourse(course) {
    return `<li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
            </li>`
}

// viết hàm gọi api lấy dữ liệu render ra giao diện sử dụng fetch
async function getCourses() {
    var courses = await axios({
        method: "GET",
        url: courseApi
    })

    courses = courses.data;

    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (course) {
        return renderCourse(course);
    })
    listCoursesBlock.innerHTML = htmls;
}

// xử lý delete course
async function handleDeleteCourse(id) {
    await axios({
        method: "DELETE",
        url: courseApi + '/' + id,
        headers: { "Content-Type": "application/json" }
    })

    var courseItem = document.querySelector('.course-item-' + id);
    if (courseItem) {
        courseItem.remove();
    }
}

// xử lý update course
async function handleUpdateCourse(id) {
    // lấy thông tin cần sửa
    var course = await axios({
        method: "GET",
        url: courseApi + "/" + id
    });

    course = course.data;
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');

    name.value = course.name;
    description.value = course.description;

    var createBtn = document.querySelector('#createBtn');
    var updateBtn = document.createElement('button');
    updateBtn.innerText = 'Edit';
    createBtn.parentElement.appendChild(updateBtn);

    updateBtn.onclick = async function () {
        var formData = {
            name: name.value,
            description: description.value
        }

        var course = await axios({
            method: "PUT",
            url: courseApi + "/" + id,
            data: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })

        const htmls = renderCourse(course.data);
        var courseItem = document.querySelector('.course-item-' + id);
        if (courseItem) {
            courseItem.innerHTML = htmls;
        }
        updateBtn.remove();
        name.value = '';
        description.value = '';
    }
}

// xử lý form create
var createBtn = document.querySelector('#createBtn');
createBtn.onclick = async function () {
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');

    var formData = {
        name: name.value,
        description: description.value
    }

    var course = await axios({
        method: "POST",
        url: courseApi,
        data: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    })

    name.value = '';
    description.value = '';
    const htmls = renderCourse(course);
    var listCoursesBlock = document.querySelector('#list-courses');
    listCoursesBlock.innerHTML += htmls;
}
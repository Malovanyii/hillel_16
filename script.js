function Student(firstName, lastName, birthYear, grades = []) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.birthYear = birthYear;
	this.grades = grades; // оцінки
	this.attendance = [...Array(25)].map(() => null);

	this.getAge = function () {
		const currentYear = new Date().getFullYear();
		return currentYear - this.birthYear;
	};

	this.getAverageGrade = function () {
		if (this.grades.length === 0) return 0;
		const total = this.grades.reduce((sum, grade) => sum + grade, 0);
		return total / this.grades.length;
	};

	this.present = function () {
		const index = this.attendance.indexOf(null);
		if (index !== -1) {
			this.attendance[index] = true;
		}
	};

	this.absent = function () {
		const index = this.attendance.indexOf(null);
		if (index !== -1) {
			this.attendance[index] = false;
		}
	};

	this.getAttendanceRate = function () {
		let attendedClasses = 0;
		let totalClasses = 0;
		for (const value of this.attendance) {
			if (value !== null) {
				totalClasses++;
				if (value === true) {
					attendedClasses++;
				}
			}
		}
		return totalClasses === 0 ? 0 : attendedClasses / totalClasses;
	};

	this.summary = function () {
		const averageGrade = this.getAverageGrade();
		const attendanceRate = this.getAttendanceRate();

		if (averageGrade > 90 && attendanceRate > 0.9) {
			return "Молодець!";
		} else if (averageGrade > 90 || attendanceRate > 0.9) {
			return "Добре, але можна краще.";
		} else {
			return "Редиска!";
		}
	};
}

function processStudent(student, actions) {
	actions.forEach((action) => {
		if (action === "present") student.present();
		else if (action === "absent") student.absent();
	});
	console.log(
		`${student.firstName} ${student.lastName}, вік: ${student.getAge()}`
	);
	console.log("Середній бал:", student.getAverageGrade());
	console.log("Відвідуваність:", student.getAttendanceRate());
	console.log("Підсумок:", student.summary());
}

const student1 = new Student("Олексій", "Попов", 2001, [95, 100, 92, 90]);
const student2 = new Student("Валентин", "Коваленко", 2002, [91, 90, 90, 90]);
const student3 = new Student("Володимир", "Шевченко", 2003, [60, 70, 60, 65]);

processStudent(student1, ["present", "present", "present", "present"]);
processStudent(student2, ["present", "absent", "absent", "absent"]);
processStudent(student3, ["absent", "absent", "absent", "absent"]);

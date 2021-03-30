# Details

Date : 2021-03-29 16:35:45

Directory /Users/paulstevens/Developer/alchezoomy2-be/lib

Total : 45 files,  1759 codes, 20 comments, 474 blanks, all 2253 lines

[summary](results.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [lib/app.js](/lib/app.js) | JavaScript | 30 | 0 | 13 | 43 |
| [lib/auth/admin-auth.js](/lib/auth/admin-auth.js) | JavaScript | 11 | 0 | 4 | 15 |
| [lib/auth/ensure-admin-auth.js](/lib/auth/ensure-admin-auth.js) | JavaScript | 11 | 0 | 1 | 12 |
| [lib/auth/ensure-student-auth.js](/lib/auth/ensure-student-auth.js) | JavaScript | 11 | 0 | 1 | 12 |
| [lib/auth/ensure-teacher-auth.js](/lib/auth/ensure-teacher-auth.js) | JavaScript | 11 | 0 | 4 | 15 |
| [lib/auth/invite-auth.js](/lib/auth/invite-auth.js) | JavaScript | 16 | 0 | 4 | 20 |
| [lib/auth/jwt.js](/lib/auth/jwt.js) | JavaScript | 10 | 0 | 2 | 12 |
| [lib/auth/student-auth.js](/lib/auth/student-auth.js) | JavaScript | 32 | 5 | 13 | 50 |
| [lib/auth/student-invite-auth.js](/lib/auth/student-invite-auth.js) | JavaScript | 16 | 0 | 4 | 20 |
| [lib/auth/teacher-auth.js](/lib/auth/teacher-auth.js) | JavaScript | 36 | 0 | 11 | 47 |
| [lib/auth/teacher-invite-auth.js](/lib/auth/teacher-invite-auth.js) | JavaScript | 15 | 0 | 4 | 19 |
| [lib/client.js](/lib/client.js) | JavaScript | 8 | 4 | 2 | 14 |
| [lib/controllers/admin-auth-routes.js](/lib/controllers/admin-auth-routes.js) | JavaScript | 48 | 0 | 12 | 60 |
| [lib/controllers/admin-s3-routes.js](/lib/controllers/admin-s3-routes.js) | JavaScript | 23 | 0 | 3 | 26 |
| [lib/controllers/admin-student-routes.js](/lib/controllers/admin-student-routes.js) | JavaScript | 22 | 0 | 4 | 26 |
| [lib/controllers/admin-teacher-routes.js](/lib/controllers/admin-teacher-routes.js) | JavaScript | 37 | 0 | 8 | 45 |
| [lib/controllers/deauthorize.js](/lib/controllers/deauthorize.js) | JavaScript | 36 | 0 | 12 | 48 |
| [lib/controllers/student-bookmark-routes.js](/lib/controllers/student-bookmark-routes.js) | JavaScript | 35 | 0 | 7 | 42 |
| [lib/controllers/student-favorite-routes.js](/lib/controllers/student-favorite-routes.js) | JavaScript | 34 | 0 | 9 | 43 |
| [lib/controllers/student-meetings-routes.js](/lib/controllers/student-meetings-routes.js) | JavaScript | 24 | 9 | 17 | 50 |
| [lib/controllers/student-routes.js](/lib/controllers/student-routes.js) | JavaScript | 70 | 1 | 27 | 98 |
| [lib/controllers/teacher-meetings-routes.js](/lib/controllers/teacher-meetings-routes.js) | JavaScript | 50 | 0 | 26 | 76 |
| [lib/controllers/teacher-routes.js](/lib/controllers/teacher-routes.js) | JavaScript | 32 | 0 | 16 | 48 |
| [lib/controllers/teacher-subscription-routes.js](/lib/controllers/teacher-subscription-routes.js) | JavaScript | 39 | 0 | 13 | 52 |
| [lib/emoji.js](/lib/emoji.js) | JavaScript | 10 | 0 | 5 | 15 |
| [lib/middleware/error.js](/lib/middleware/error.js) | JavaScript | 9 | 1 | 4 | 14 |
| [lib/middleware/not-found.js](/lib/middleware/not-found.js) | JavaScript | 5 | 0 | 1 | 6 |
| [lib/models/Admin.js](/lib/models/Admin.js) | JavaScript | 53 | 0 | 20 | 73 |
| [lib/models/Bookmark.js](/lib/models/Bookmark.js) | JavaScript | 67 | 0 | 10 | 77 |
| [lib/models/Favorite.js](/lib/models/Favorite.js) | JavaScript | 83 | 0 | 13 | 96 |
| [lib/models/Meeting.js](/lib/models/Meeting.js) | JavaScript | 236 | 0 | 42 | 278 |
| [lib/models/Student.js](/lib/models/Student.js) | JavaScript | 112 | 0 | 25 | 137 |
| [lib/models/Subscription.js](/lib/models/Subscription.js) | JavaScript | 79 | 0 | 18 | 97 |
| [lib/models/Teacher.js](/lib/models/Teacher.js) | JavaScript | 109 | 0 | 23 | 132 |
| [lib/utils/deleteFromS3.js](/lib/utils/deleteFromS3.js) | JavaScript | 18 | 0 | 4 | 22 |
| [lib/utils/insertNewChat.js](/lib/utils/insertNewChat.js) | JavaScript | 27 | 0 | 14 | 41 |
| [lib/utils/insertNewTranscript.js](/lib/utils/insertNewTranscript.js) | JavaScript | 25 | 0 | 8 | 33 |
| [lib/utils/inviteStudent.js](/lib/utils/inviteStudent.js) | JavaScript | 31 | 0 | 8 | 39 |
| [lib/utils/inviteTeacher.js](/lib/utils/inviteTeacher.js) | JavaScript | 30 | 0 | 8 | 38 |
| [lib/utils/isStudentAlsoTeacher.js](/lib/utils/isStudentAlsoTeacher.js) | JavaScript | 13 | 0 | 5 | 18 |
| [lib/utils/parseMeetingObj.js](/lib/utils/parseMeetingObj.js) | JavaScript | 42 | 0 | 12 | 54 |
| [lib/utils/parseReturnedStudentInfo.js](/lib/utils/parseReturnedStudentInfo.js) | JavaScript | 53 | 0 | 10 | 63 |
| [lib/utils/parseReturnedTeacherInfo.js](/lib/utils/parseReturnedTeacherInfo.js) | JavaScript | 58 | 0 | 11 | 69 |
| [lib/utils/sendToS3.js](/lib/utils/sendToS3.js) | JavaScript | 30 | 0 | 10 | 40 |
| [lib/utils/updateZoomInfo.js](/lib/utils/updateZoomInfo.js) | JavaScript | 12 | 0 | 6 | 18 |

[summary](results.md)
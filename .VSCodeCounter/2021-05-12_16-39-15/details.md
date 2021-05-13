# Details

Date : 2021-05-12 16:39:15

Directory /Users/paulstevens/Developer/alchezoomy2-be/lib

Total : 50 files,  2053 codes, 59 comments, 593 blanks, all 2705 lines

[summary](results.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [lib/app.js](/lib/app.js) | JavaScript | 35 | 8 | 16 | 59 |
| [lib/auth/admin-auth.js](/lib/auth/admin-auth.js) | JavaScript | 11 | 0 | 4 | 15 |
| [lib/auth/ensure-admin-auth.js](/lib/auth/ensure-admin-auth.js) | JavaScript | 11 | 0 | 1 | 12 |
| [lib/auth/ensure-student-auth.js](/lib/auth/ensure-student-auth.js) | JavaScript | 11 | 0 | 1 | 12 |
| [lib/auth/ensure-teacher-auth.js](/lib/auth/ensure-teacher-auth.js) | JavaScript | 11 | 0 | 3 | 14 |
| [lib/auth/invite-auth.js](/lib/auth/invite-auth.js) | JavaScript | 16 | 0 | 4 | 20 |
| [lib/auth/jwt.js](/lib/auth/jwt.js) | JavaScript | 10 | 0 | 2 | 12 |
| [lib/auth/student-auth.js](/lib/auth/student-auth.js) | JavaScript | 14 | 23 | 13 | 50 |
| [lib/auth/student-invite-auth.js](/lib/auth/student-invite-auth.js) | JavaScript | 16 | 0 | 4 | 20 |
| [lib/auth/student-reset-hash.js](/lib/auth/student-reset-hash.js) | JavaScript | 15 | 0 | 4 | 19 |
| [lib/auth/teacher-auth.js](/lib/auth/teacher-auth.js) | JavaScript | 49 | 0 | 22 | 71 |
| [lib/auth/teacher-invite-auth.js](/lib/auth/teacher-invite-auth.js) | JavaScript | 15 | 0 | 4 | 19 |
| [lib/client.js](/lib/client.js) | JavaScript | 8 | 4 | 2 | 14 |
| [lib/controllers/admin-auth-routes.js](/lib/controllers/admin-auth-routes.js) | JavaScript | 48 | 0 | 12 | 60 |
| [lib/controllers/admin-s3-routes.js](/lib/controllers/admin-s3-routes.js) | JavaScript | 24 | 0 | 3 | 27 |
| [lib/controllers/admin-student-routes.js](/lib/controllers/admin-student-routes.js) | JavaScript | 22 | 0 | 4 | 26 |
| [lib/controllers/admin-teacher-routes.js](/lib/controllers/admin-teacher-routes.js) | JavaScript | 37 | 0 | 8 | 45 |
| [lib/controllers/deauthorize.js](/lib/controllers/deauthorize.js) | JavaScript | 38 | 0 | 13 | 51 |
| [lib/controllers/student-bookmark-routes.js](/lib/controllers/student-bookmark-routes.js) | JavaScript | 35 | 0 | 7 | 42 |
| [lib/controllers/student-favorite-routes.js](/lib/controllers/student-favorite-routes.js) | JavaScript | 34 | 0 | 9 | 43 |
| [lib/controllers/student-meetings-routes.js](/lib/controllers/student-meetings-routes.js) | JavaScript | 24 | 0 | 15 | 39 |
| [lib/controllers/student-routes.js](/lib/controllers/student-routes.js) | JavaScript | 131 | 1 | 41 | 173 |
| [lib/controllers/teacher-meetings-routes.js](/lib/controllers/teacher-meetings-routes.js) | JavaScript | 64 | 0 | 35 | 99 |
| [lib/controllers/teacher-routes.js](/lib/controllers/teacher-routes.js) | JavaScript | 82 | 0 | 34 | 116 |
| [lib/controllers/teacher-subscription-routes.js](/lib/controllers/teacher-subscription-routes.js) | JavaScript | 39 | 0 | 13 | 52 |
| [lib/emoji.js](/lib/emoji.js) | JavaScript | 10 | 0 | 5 | 15 |
| [lib/middleware/error.js](/lib/middleware/error.js) | JavaScript | 9 | 1 | 4 | 14 |
| [lib/middleware/not-found.js](/lib/middleware/not-found.js) | JavaScript | 5 | 0 | 1 | 6 |
| [lib/models/Admin.js](/lib/models/Admin.js) | JavaScript | 48 | 0 | 22 | 70 |
| [lib/models/Bookmark.js](/lib/models/Bookmark.js) | JavaScript | 101 | 0 | 10 | 111 |
| [lib/models/Favorite.js](/lib/models/Favorite.js) | JavaScript | 84 | 0 | 13 | 97 |
| [lib/models/Meeting.js](/lib/models/Meeting.js) | JavaScript | 244 | 2 | 48 | 294 |
| [lib/models/Student.js](/lib/models/Student.js) | JavaScript | 189 | 0 | 51 | 240 |
| [lib/models/Subscription.js](/lib/models/Subscription.js) | JavaScript | 80 | 0 | 19 | 99 |
| [lib/models/Teacher.js](/lib/models/Teacher.js) | JavaScript | 121 | 11 | 31 | 163 |
| [lib/utils/attachCookie.js](/lib/utils/attachCookie.js) | JavaScript | 9 | 0 | 2 | 11 |
| [lib/utils/deleteFromS3.js](/lib/utils/deleteFromS3.js) | JavaScript | 18 | 0 | 4 | 22 |
| [lib/utils/fetchColorPalette.js](/lib/utils/fetchColorPalette.js) | JavaScript | 13 | 0 | 4 | 17 |
| [lib/utils/insertNewChat.js](/lib/utils/insertNewChat.js) | JavaScript | 27 | 0 | 14 | 41 |
| [lib/utils/insertNewTranscript.js](/lib/utils/insertNewTranscript.js) | JavaScript | 42 | 0 | 12 | 54 |
| [lib/utils/inviteStudent.js](/lib/utils/inviteStudent.js) | JavaScript | 31 | 0 | 8 | 39 |
| [lib/utils/inviteTeacher.js](/lib/utils/inviteTeacher.js) | JavaScript | 30 | 0 | 8 | 38 |
| [lib/utils/logTeacherAuth.js](/lib/utils/logTeacherAuth.js) | JavaScript | 5 | 7 | 3 | 15 |
| [lib/utils/parseMeetingObj.js](/lib/utils/parseMeetingObj.js) | JavaScript | 37 | 0 | 12 | 49 |
| [lib/utils/parseNewTeacherInfo.js](/lib/utils/parseNewTeacherInfo.js) | JavaScript | 28 | 0 | 8 | 36 |
| [lib/utils/parseReturnedTeacherInfo.js](/lib/utils/parseReturnedTeacherInfo.js) | JavaScript | 37 | 1 | 12 | 50 |
| [lib/utils/refreshToken.js](/lib/utils/refreshToken.js) | JavaScript | 17 | 1 | 8 | 26 |
| [lib/utils/resetStudentPassword.js](/lib/utils/resetStudentPassword.js) | JavaScript | 29 | 0 | 8 | 37 |
| [lib/utils/sendToS3.js](/lib/utils/sendToS3.js) | JavaScript | 27 | 0 | 10 | 37 |
| [lib/utils/updateZoomInfo.js](/lib/utils/updateZoomInfo.js) | JavaScript | 12 | 0 | 2 | 14 |

[summary](results.md)
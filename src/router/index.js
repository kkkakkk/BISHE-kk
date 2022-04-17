import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件

import Login from '@/components/Home/Login'

import AcademicStaff from '../components/Home/Role/AcademicStaff'
import AcademicStaff_TrainingProgram from '../components/AcademicStaff/TrainingProgram'
import AcademicStaff_StudentInfo from '../components/AcademicStaff/AcademicStaff_StudentInfo'
import AcademicStaff_TeacherInfo from '../components/AcademicStaff/TeacherInfo'
import AcademicStaff_InitialTrainingProgram from '../components/AcademicStaff/TrainingProgram/InitialTrainingProgram'
import AcademicStaff_ViewTrainingProgram from '../components/AcademicStaff/TrainingProgram/ViewTrainingProgram'
import AcademicStaff_TeachingInfo from '../components/AcademicStaff/TrainingProgram/ViewTeachingInfo'

import AcademicStaffMonitor from '../components/AcademicStaff/AcademicStaffMonitor'
import AcademicStaffEndCourse from '../components/AcademicStaff/AcademicStaffEndCourse'
import AcademicStaffHistoryTP from '../components/AcademicStaff/AcademicStaffHistoryTP'
import JobRecommendation from '../components/AcademicStaff/JobRecommendation'

//ZKT Add
import FatherStep_1 from '../components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/FatherStep_1'
import FatherStep_2 from '../components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/FatherStep_2'
import FatherStep_3 from '../components/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/FatherStep_3'

import Teacher from "../components/Home/Role/Teacher";
import CourseManager from '../components/Teacher/CourseManager'
import Redirect from '../components/Teacher/Redirect'

import Student from '../components/Home/Role/Student'
import AssessmentManager from '../components/Student/AssessmentManager'
import AssessInfo_Student from '../components/Student/AssessInfo_Student'
import CourseInitial from '../components/Teacher/CourseInitial'
import ShowCourseInfo from '../components/Teacher/ShowCourseInfo'
import EditSupport from '../components/Teacher/EditSupport'

import ASManager from '../components/Home/Role/ASManager'
import ASManager_Course from '../components/ASManager/ASManager_Course'
import ASManager_TP from '../components/ASManager/ASManager_TP'
import EvaluateMember from '../components/ASManager/EvaluateMember'
import ASManager_Student from '../components/ASManager/ASManager_Student'

import CourseEvaluateStaff from '../components/Home/Role/CourseEvaluateStaff'
import TeachingEvaluateStaff from '../components/Home/Role/TeachingEvaluateStaff'
import GuidanceCommittee from '../components/Home/Role/GuidanceCommittee'

import AcademicStaff_WorkRecommedation from '../components/AcademicStaff/StudentInfo/AcademicStaff_WorkRecommedation'
import AcademicStaff_StudentInfoDetail from '../components/AcademicStaff/StudentInfo/StudentInfoDetail'
import AS_Manager_Redirect from '../components/ASManager/Redirect'


import TeachingEvaluateStaff_Course from "@/components/TeachingEvaluateStaff/TeachingEvaluateStaff_Course";
import TeachingEvaluateStaff_Student from "@/components/TeachingEvaluateStaff/TeachingEvaluateStaff_Student";
import TeachingEvaluateStaff_TP from "@/components/TeachingEvaluateStaff/TeachingEvaluateStaff_TP";
import TeachingEvaluateStaff_Redirect from "@/components/TeachingEvaluateStaff/Redirect"

import GuidanceCommittee_Course from "@/components/GuidanceCommittee/GuidanceCommittee_Course";
import GuidanceCommittee_Student from "@/components/GuidanceCommittee/GuidanceCommittee_Student";
import GuidanceCommittee_TP from "@/components/GuidanceCommittee/GuidanceCommittee_TP";
import GuidanceCommittee_Redirect from "@/components/GuidanceCommittee/Redirect"

import CourseEvaluateStaff_CourseInfo from '../components/CourseEvaluateStaff/CourseEvaluateStaff_CourseInfo'

import AcademicStaff_StudentInfoInit from "@/components/AcademicStaff/StudentInfoInit";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'login',
      redirect: '/login',
      component: Login,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/AcademicStaff',
      name: 'AcademicStaff',
      component: AcademicStaff,
      children:[
        {
          path: '/',
          name: AcademicStaff,
          redirect: '/AcademicStaff/MonitoringCourse'
        },
        {
          path: '/AcademicStaff/TrainingProgram',
          name: 'AcademicStaff_TrainingProgram',
          component: AcademicStaff_TrainingProgram
        },
        {
          path: '/AcademicStaff/TeacherInfo',
          name: 'AcademicStaff_TeacherInfo',
          component: AcademicStaff_TeacherInfo
        },
        {
          path: '/AcademicStaff/StudentInfoInit',
          name: 'AcademicStaff_StudentInfoInit',
          component: AcademicStaff_StudentInfoInit
        },
        {
          path: '/AcademicStaff/TrainingProgram/InitialTrainingProgram',
          name: 'AcademicStaff_InitialTrainingProgram',
          component: AcademicStaff_InitialTrainingProgram
        },
        {
          path: '/AcademicStaff/TrainingProgram/TrainingProgramDetail',
          name: 'AcademicStaff_ViewTrainingProgram',
          component: AcademicStaff_ViewTrainingProgram
        },
        {
          path:'/AcademicStaff/TrainingProgram/TeachingDetail',
          name:'AcademicStaff_TeachingInfo',
          component:AcademicStaff_TeachingInfo
        },
        {
          path: '/AcademicStaff/StudentInfo',
          name: 'AcademicStaff_StudentInfo',
          component: AcademicStaff_StudentInfo
        },
        {
          path: '/AcademicStaff/WorkRecommedation',
          name: 'AcademicStaff_WorkRecommedation',
          component: AcademicStaff_WorkRecommedation
        },
        {
          path: '/StudentInfo/StudentInfoDetail',
          name: 'AcademicStaff_StudentInfoDetail',
          component: AcademicStaff_StudentInfoDetail
        },
        {path: '/AcademicStaff/MonitoringCourse',
          name: 'AcademicStaffMonitor',
          component: AcademicStaffMonitor},
        {path: '/AcademicStaff/EndingCourse',
          name: 'AcademicStaffEndCourse',
          component: AcademicStaffEndCourse},
        {path: '/AcademicStaff/HistoryTP',
          name: 'AcademicStaffHistoryTP',
          component: AcademicStaffHistoryTP},
        {
          path: '/AcademicStaff/JobRecommendation',
          name: 'JobRecommendation',
          component: JobRecommendation
        },




        //ZKT Add
        {
          path: '/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/FatherStep_1',
          name: 'FatherStep_1',
          component: FatherStep_1
        },
        {
          path: '/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/FatherStep_2',
          name: 'FatherStep_2',
          component: FatherStep_2
        },
        {
          path: '/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/FatherStep_3',
          name: 'FatherStep_3',
          component: FatherStep_3
        },

        

      ]
    },
    {
      path:'/Teacher',
      name:'Teacher',
      component:Teacher,
      children:[{
        path: '/redirect',
        name: 'Redirect',
        component: Redirect
      }, {
        path: '/Teacher/CourseManager',
        name: 'CourseManager',
        component: CourseManager,
        children:[
          {
            path: '/Teacher/CourseManager/ShowCourseInfo',
            name: 'ShowCourseInfo',
            component: ShowCourseInfo
          },
          {
            path: '/Teacher/CourseManager/CourseInitial',
            name: 'CourseInitial',
            component: CourseInitial
          },
          {
            path:'/Teacher/CourseManager/EditSupport',
            name:'EditSupport',
            component: EditSupport
          },

        ]
      },

      ]
    },
    {
      path:'/Student',
      name:'Student',
      component:Student,
      children:[{
        path: '/student/redirect',
        name: 'Redirect',
        component: Redirect
      },{
        path: '/Student/AssessmentManager',
        name: 'AssessmentManager',
        component: AssessmentManager
      },{
        path: '/Student/AssessInfo_Student',
        name: 'AssessInfo_Student',
        component: AssessInfo_Student
      }]
    },
    {
      path:'/ASManager',
      name:'ASManager',
      component:ASManager,
      children:[{
        path: '/ASManager/redirect',
        name: 'AS_Manager_Redirect',
        component: AS_Manager_Redirect

      },

        {
        path: '/ASManager/TP',
        name: 'ASManager_TP',
        component: ASManager_TP
      },{
        path: '/ASManager/EvaluateMember',
        name: 'EvaluateMember',
        component: EvaluateMember
      },{
        path: '/ASManager/Course',
        name: 'ASManager_Course',
        component: ASManager_Course
      },{
        path: '/ASManager/ASManager_Student',
        name: 'ASManager_Student',
        component: ASManager_Student
      },
        //   {
        //   path: 'StudentInfo/StudentInfoDetail',
        //   name: 'StudentInfoDetail',
        //   component: StudentInfoDetail1
        // },

      ]
    },
    {
      path: '/GuidanceCommittee',
      name: 'GuidanceCommittee',
      component: GuidanceCommittee,
      children:[
        {
          path: '/GuidanceCommittee/redirect',
          name: 'GuidanceCommittee_Redirect',
          component: GuidanceCommittee_Redirect
        }, {
          path: '/GuidanceCommittee/GuidanceCommittee_TP',
          name: 'GuidanceCommittee_TP',
          component: GuidanceCommittee_TP
        },{
          path: '/GuidanceCommittee/GuidanceCommittee_Course',
          name: 'GuidanceCommittee_Course',
          component: GuidanceCommittee_Course
        },{
          path: '/GuidanceCommittee/GuidanceCommittee_Student',
          name: 'GuidanceCommittee_Student',
          component: GuidanceCommittee_Student
        }
      ]
    },
    {
      path: '/TeachingEvaluateStaff',
      name: 'TeachingEvaluateStaff',
      component: TeachingEvaluateStaff,
      children:[
        {
        path: '/TeachingEvaluateStaff/redirect',
        name: 'TeachingEvaluateStaff_Redirect',
        component: TeachingEvaluateStaff_Redirect
        }, {
          path: '/TeachingEvaluateStaff/TeachingEvaluateStaff_TP',
          name: 'TeachingEvaluateStaff_TP',
          component: TeachingEvaluateStaff_TP
        },{
          path: '/TeachingEvaluateStaff/TeachingEvaluateStaff_Course',
          name: 'TeachingEvaluateStaff_Course',
          component: TeachingEvaluateStaff_Course
        },{
          path: '/TeachingEvaluateStaff/TeachingEvaluateStaff_Student',
          name: 'TeachingEvaluateStaff_Student',
          component: TeachingEvaluateStaff_Student
        }
        ]
    },

    {
      path: '/CourseEvaluateStaff',
      name: 'CourseEvaluateStaff',
      component: CourseEvaluateStaff,

      children:[{
        path: '/CourseEvaluateStaff/redirect',
        name: 'Redirect',
        component: Redirect
      },{
        path: '/CourseEvaluateStaff/CourseInfo',
        name: 'CourseEvaluateStaff_CourseInfo',
        component: CourseEvaluateStaff_CourseInfo
      },


      ]

    }

  ]
})


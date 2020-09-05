import DashboardIcon from '@material-ui/icons/Dashboard';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
export const NavList = [{
        name: 'Dashboard',
        link: '/dashboard',
        icon: DashboardIcon,
    },
    {
        name: 'Courses',
        link: '/courses',
        icon: VideoLibraryIcon,
        subMenu: [{
                name: 'Manage Courses',
                link: '/myCourses',
                icon: LibraryBooksIcon,
            },
            {
                name: 'Course Tools',
                link: '/course/tool',
                icon: ImportantDevicesIcon,
            },
            {
                name: 'Upload Course',
                link: '/courses',
                icon: VideoLibraryIcon,
            },
        ]
    },
    {
        name: 'Resource',
        link: '/resource',
        icon: LibraryBooksIcon,
    },

]
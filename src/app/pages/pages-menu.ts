import { NbMenuItem } from '@nebular/theme';
let MENU_ITEMS: NbMenuItem[]

export function sidemenu(type) {
  MENU_ITEMS = [
      //user admin
    
    {
      title: 'Admin Dashboard',
      icon: 'home-outline',
      hidden: !(['a'].includes(type)),
      link: '/pages/admin-dashboard',
      home: true,
    },
    {
      title: 'Merchant',
      icon: 'people-outline',
      hidden: !(['a'].includes(type)),
      children: [
        // {
        //   title: 'Active Merchant',
        //   icon: 'corner-down-right-outline',
        //   link: '/pages/active-merchant'
        // },
        {
          title: 'Pending Merchant',
          icon: 'corner-down-right-outline',
          link: '/pages/pending-merchant'
        }
      ]
    },

    {
      title: 'Apps',
      icon: 'person-outline',
      link: '/pages/admin-apps',
      hidden: !(['a'].includes(type)),
    },

    {
      title: 'Settings',
      link: '/settings',
      icon: 'settings-outline',
      hidden: !(['a'].includes(type)),
      children: [
        {
          title: 'Bank',
          icon: 'corner-down-right-outline',
          link: '/pages/settings/bank',
        },
        {
          title: 'Business Category',
          icon: 'corner-down-right-outline',
          link: '/pages/settings/business-category',
        },
        {
          title: 'Business Type',
          icon: 'corner-down-right-outline',
          link: '/pages/settings/business-type',
        },

      ],
    },
    // user merchant
   
    {
      title: 'Document Processing',
      icon: 'credit-card-outline',
      hidden: !(['m'].includes(type)),
      link: '/pages/document-processing',
      home: true,
    },
    {
      title: 'Submit Document',
      icon: 'credit-card-outline',
      hidden: !(['m'].includes(type)),
      link: '/pages/submit-document',
      home: true,
    },
    // {
    //   title: 'Dashboard',
    //   icon: 'home-outline',
    //   hidden: !(['m'].includes(type)),
    //   link: '/pages/dashboard',
    //   home: true,
    // },
    {
      title: 'Merchant Profile',
      icon: 'home-outline',
      hidden: !(['m'].includes(type)),
      link: '/pages/merchant-profile-details',
      home: true,
    },
    {
      title: 'Payment Link',
      icon: 'person-outline',
      link: '/pages/payment-link',
      hidden: localStorage.getItem("is_approved")=="0" || !(['m'].includes(type)),
    },
 
    {
      title: 'Subscription Review',
      icon: 'person-outline',
      link: '/pages/subscription-review',
      hidden: !(['m'].includes(type)),
    },
    {
      title: 'Transaction History',
      icon: 'clock-outline',
      hidden: !(['m',].includes(type)),
      children: [
        // {
        //   title: 'Coupon Transactions',
        //   icon: 'corner-down-right-outline',
        //   link: '/pages/coupon-transaction',
        // },
        {
          title: 'IPG Transaction History',
          icon: 'corner-down-right-outline',
          link: '/pages/transaction-history',
        },
      ],
    },
    {
      title: 'IPG Developer',
      icon: 'person-outline',
      link: '/pages/ipg-developer',
      hidden: localStorage.getItem("is_approved")=="0" || !(['m'].includes(type)),
      children: [
        {
          //App module
          title: 'App',
          icon: 'corner-down-right-outline',
          link: '/pages/ipg-developer/app',
        },
      ]
    },
    {
      title: 'Packages',
      icon: 'folder-add-outline',
      hidden: !(['a',].includes(type)),
      children: [
        {
          title: 'Package Details',
          icon: 'corner-down-right-outline',
          link: '/pages/package/data',
        },
        {
          title: 'Package Items',
          icon: 'corner-down-right-outline',
          link: '/pages/package/item',
        }
      ],
    },
    {
      title: 'Reports',
      icon: 'people-outline',
      hidden: !(['a'].includes(type)),
      children: [
        {
          title: 'IPG Report',
          icon: 'corner-down-right-outline',
          link: '/pages/ipg-report'
        }
      ]
    },
    // {
    //   title: 'QR Generator',
    //   icon: 'grid-outline',
    //   link: '/pages/qr-generate',
    //   hidden: !(['m'].includes(type)),
    // },
    // {
    //   title: 'Setting',
    //   icon: 'clock-outline',
    //   hidden: !(['m',].includes(type)),
    //   children: [
    //     {
    //       title: 'Collection Type',
    //       icon: 'corner-down-right-outline',
    //       link: '/pages/collection-type',
    //     },

    //     {
    //       title: 'Add Quick Questions',
    //       icon: 'corner-down-right-outline',
    //       link: '/pages/question',
    //     },
    //     {
    //       title: 'Payment Gateway',
    //       icon: 'corner-down-right-outline',
    //       link: '/pages/payment-gateway',
    //     },
    //   ],
    // },

    //digital user
    // {
    //   title: 'User Profile',
    //   icon: 'file-add-outline',
    //   link: '/pages/digital-user-profile',
    //   hidden: !(['d'].includes(type)),
    // },
    // {
    
//   title: 'Digital User Configuration',
    //   icon: 'smartphone-outline',
    //   hidden: !(['d'].includes(type)),
    //   children: [
    //     {
    //       title: 'Category',
    //       icon: 'corner-down-right-outline',
    //       link: '/pages/category',
    //     },
    //   ],
    // },
    // {
    //   title: 'Customer Feedback',
    //   icon: 'file-add-outline',
    //   link: '/pages/customer-feedback',
    //   hidden: !(['d'].includes(type)),
    // },
  ];

  return MENU_ITEMS
}



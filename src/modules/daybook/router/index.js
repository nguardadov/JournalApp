import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'
export default {
  name: 'daybook',
  component: () =>
    //
    import(
      /* webpackChunkName: "daybook" */ '@/modules/daybook/layout/DayBookLayout.vue'
    ),
  children: [
    {
      path: '',
      name: 'no-entry',
      beforeEnter: [isAuthenticatedGuard],
      component: () =>
        import(
          /* webpackChunkName: "daybook" */ '@/modules/daybook/views/NoEntrySelected.vue'
        ),
    },
    {
      path: ':id',
      name: 'entry',
      beforeEnter: [isAuthenticatedGuard],
      component: () =>
        import(
          /* webpackChunkName: "daybook" */ '@/modules/daybook/views/EntryView.vue'
        ),
      props: (route) => {
        return {
          id: route.params.id,
        }
      },
    },
  ],
}

<template>
  <div>
    <aluno-dashboard v-if="papel === 'Aluno'"></aluno-dashboard>
    <div v-else class="dashboard">

      <vuestic-widget class="no-padding no-v-padding">
        <vuestic-tabs :names="[$t('dashboard.usersAndMembers'), $t('dashboard.setupProfile'), $t('dashboard.features')]" ref="tabs">
          <div :slot="$t('dashboard.usersAndMembers')">
            <users-members-tab></users-members-tab>
          </div>
          <div :slot="$t('dashboard.setupProfile')">
            <setup-profile-tab></setup-profile-tab>
          </div>
          <div :slot="$t('dashboard.features')">
            <features-tab></features-tab>
          </div>
        </vuestic-tabs>
      </vuestic-widget>

      <dashboard-bottom-widgets></dashboard-bottom-widgets>

    </div>
  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import AlunoDashboard from './AlunoDashboard'
  import UsersMembersTab from './users-and-members-tab/UsersMembersTab.vue'
  import SetupProfileTab from './setup-profile-tab/SetupProfileTab.vue'
  import FeaturesTab from './features-tab/FeaturesTab.vue'
  import DataVisualisationTab from './data-visualisation-tab/DataVisualisation.vue'
  import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

  export default {
    name: 'dashboard',
    components: {
      DataVisualisationTab,
      AlunoDashboard,
      DashboardInfoWidgets,
      UsersMembersTab,
      SetupProfileTab,
      FeaturesTab,
      DashboardBottomWidgets
    },
    computed: {
      papel () {
        return this.$store.state.userState.user.papel
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>

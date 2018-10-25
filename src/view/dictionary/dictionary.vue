<template>
  <div class="dictionary">
    <Row :gutter="16">
      <Col span="9">
      <dictionaryType @openItem='dictionaryItemInit'></dictionaryType>
      </Col>
      <Col span="15">
      <dictionaryItem ref='dictionaryItem'></dictionaryItem>
      </Col>
    </Row>
  </div>
</template>
<script>
import dictionaryType from "@/view/dictionary/dictionaryType";
import dictionaryItem from "@/view/dictionary/dictionaryItem";
export default {
  components: {
    dictionaryType,
    dictionaryItem
  },
  data () {
    return {

    };
  },
  computed: {},
  methods: {
    dictionaryItemInit (params) {
      this.$refs['dictionaryItem'].searchFields.typeCode = params.code;
      this.$refs['dictionaryItem'].formModel.typeCode = params.code;
      this.$refs['dictionaryItem'].typeName = params.name;
      this.$refs['dictionaryItem'].getData();
    }
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
</style>

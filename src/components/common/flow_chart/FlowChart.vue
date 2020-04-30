
<template>
    <div :style="{minHeight: heightData+'px'}" class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">
        <div class="tip pull-left" >
            <p style="color:#37db72"><Icon type="ios-square"></Icon>：审批通过</p>
            <p style="color:#fa8c2a"><Icon type="ios-square"></Icon>：审批中</p>
            <p style="color:#ff0000"><Icon type="ios-square"></Icon>：审批拒绝</p>
            <p style="color:#2768AC"><Icon type="ios-square"></Icon>：未到达</p>
        </div>
        <template v-for="(item, key) in node">
            <div class="window jtk-node" :class="[item.class, item.type]" :id="'LCTNODE'+item.id" :style="{top:(key*7+2)+'em', left:'20em'}">
                <strong>{{item.label}}</strong>
            </div>
        </template>
    </div>
</template>
<script>
    
import { jsPlumb } from 'jsplumb';

export default {
    name: 'flow-chart',
    props : ['nodeList'],
    
    computed : {
        node() {
            return this.nodeList;
        }
    },
    data () {
        return {
            instance : {},
            connections: [] ,
            config : {
                nodeName : 'LCTNODE',//对应html里节点的ID前缀
                elementName : 'node',
                editable : false,
                sourceEndpoint : {
                    endpoint: "Dot",
                    paintStyle: {
                        //stroke: "#7AB02C",
                        fill: "transparent",
                        radius: 7,
                        strokeWidth: 1
                    },
                    isSource: true,
                    connector: [ "Flowchart", {
                        stub: [40, 60],
                        //gap: 10,
                        cornerRadius: 5,//连线的弯曲度
                        alwaysRespectStubs: true
                    } ],//流程图的线
                    connectorStyle: {
                        strokeWidth: 2,
                        stroke: "#4E81B5",
                        joinstyle: "round",
                        outlineStroke: "white",
                        outlineWidth: 5
                    },
                    connectorHoverStyle: {
                        strokeWidth: 3,
                        stroke: "#4E81B5",
                        outlineWidth: 5,
                        outlineStroke: "white"
                    },
                    maxConnections : 3,
                },
                targetEndpoint : {
                    endpoint: "Dot",
                    paintStyle: {
                        // fill: "#7AB02C",
                        radius: 7
                    },
                    maxConnections: 3,
                    isTarget: true,
                }
            },
            heightData: 100
        }
    },
    methods: {
        init() {
            if(this.node){
                for (var i = 0; i < this.node.length; i++) {
                    switch(this.node[i].status) {
                        case 'pass' :  
                            this.node[i].class = 'PASS';
                            break;
                        case 'refuse' : 
                            this.node[i].class = 'REFUSED';
                            break;
                        case 'now' : 
                            this.node[i].class = 'APPLY';
                            break;
                        default :
                            this.node[i].class = '';
                            break;
                    }
                }
            }
        },
        show () {
            this._addEndpoints();
            this._connect();
        },
        _addEndpoints(){
            for(var i in this.node){
                var _node = this.node[i];
                //画出点
                _node.source = ['BottomCenter'];
                if(_node.source){
                    for(var j = 0; j < _node.source.length; j++ ){
                        //设置uuid的规则  例如'LCTNODE1bottomCenter'
                        var sourceUUID = this.config.nodeName + _node.id + _node.source[j];
                        this.instance.addEndpoint(
                            this.config.nodeName + _node.id , 
                            this.config.sourceEndpoint, 
                            {
                                anchor: _node.source[j],
                                uuid: sourceUUID
                            }
                        );
                    }
                }
                //画入点
                _node.target = ['TopCenter'];
                if(_node.target){
                    for(var j = 0; j < _node.target.length; j++ ){
                        //设置uuid的规则  例如'LCTNODE1bottomCenter'
                        var sourceUUID = this.config.nodeName + _node.id + _node.target[j];
                        this.instance.addEndpoint(this.config.nodeName + _node.id , this.config.targetEndpoint, {
                            anchor: _node.target[j],
                            uuid: sourceUUID
                        });
                    }
                }
            }
        },
        _connect(){
            if(this.node){
                for(var i = 0; i < this.node.length - 1 ; i++){
                    var _node = this.node[i];
                    var _nextNode = this.node[i+1];
                    var source = this.config.nodeName + _node.id + 'BottomCenter';
                    var target = this.config.nodeName + _nextNode.id + 'TopCenter';
                    var connection = this.instance.connect({
                        uuids: [source, target],
                        editable: false,
                    });
                    this.connections.push(connection);
                }
            }
        },
        computeHeight(){
            let height = 0;
            if(this.node){
                for (let i = 0; i < this.node.length; i++) {
                    height += 100;
                }
            }
            
            this.heightData = height;
        }
    },
    mounted(){
        this.instance = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            ConnectionOverlays: [
                [ "Arrow", {//箭头的样式
                    location: 1,
                    visible:true,
                    width:11,
                    length:11,
                    id:"ARROW",
                }],
            ],
            Container: "canvas" //画布容器
        });
        if (this.node) {
            this.$nextTick(function() {
                this.show();
            });
            this.computeHeight();
        }
    },
    watch : {
        'nodeList' :function(){
            this.init();
            this.$nextTick(function() {
                this.show();
            });

            this.computeHeight();
        }
    },
};
</script>

<style lang="less">
@import './flow_chart.less';
</style>
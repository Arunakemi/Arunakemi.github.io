"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[142],{5611:(n,e,r)=>{r.d(e,{I:()=>V,v:()=>S});var o=r(9113),t=r(3012),i=r(268);function a(n,e,r){if(n)for(const o in n){const t=e[o.toLocaleLowerCase()];if(t){let e=n[o];"header"===o&&(e=e.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),r&&t.push(`//----${r}----//`),t.push(e)}else(0,i.R)(`${o} placement hook does not exist in shader`)}}const u=/\{\{(.*?)\}\}/g;function l(n){const e={};return(n.match(u)?.map((n=>n.replace(/[{()}]/g,"")))??[]).forEach((n=>{e[n]=[]})),e}function s(n,e){let r;const o=/@in\s+([^;]+);/g;for(;null!==(r=o.exec(n));)e.push(r[1])}function c(n,e,r=!1){const o=[];s(e,o),n.forEach((n=>{n.header&&s(n.header,o)}));const t=o;r&&t.sort();const i=t.map(((n,e)=>`       @location(${e}) ${n},`)).join("\n");let a=e.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`\n${i}\n`),a}function v(n,e){let r;const o=/@out\s+([^;]+);/g;for(;null!==(r=o.exec(n));)e.push(r[1])}function f(n,e){let r=n;for(const n in e){const o=e[n];r=o.join("\n").length?r.replace(`{{${n}}}`,`//-----${n} START-----//\n${o.join("\n")}\n//----${n} FINISH----//`):r.replace(`{{${n}}}`,"")}return r}const m=Object.create(null),d=new Map;let x=0;function p({template:n,bits:e}){const r=g(n,e);if(m[r])return m[r];const{vertex:o,fragment:t}=function(n,e){const r=e.map((n=>n.vertex)).filter((n=>!!n)),o=e.map((n=>n.fragment)).filter((n=>!!n));let t=c(r,n.vertex,!0);t=function(n,e){const r=[];v(e,r),n.forEach((n=>{n.header&&v(n.header,r)}));let o=0;const t=r.sort().map((n=>n.indexOf("builtin")>-1?n:`@location(${o++}) ${n}`)).join(",\n"),i=r.sort().map((n=>{return`       var ${e=n,e.replace(/@.*?\s+/g,"")};`;var e})).join("\n"),a=`return VSOutput(\n                ${r.sort().map((n=>` ${function(n){const e=/\b(\w+)\s*:/g.exec(n);return e?e[1]:""}(n)}`)).join(",\n")});`;let u=e.replace(/@out\s+[^;]+;\s*/g,"");return u=u.replace("{{struct}}",`\n${t}\n`),u=u.replace("{{start}}",`\n${i}\n`),u=u.replace("{{return}}",`\n${a}\n`),u}(r,t);const i=c(o,n.fragment,!0);return{vertex:t,fragment:i}}(n,e);return m[r]=b(o,t,e),m[r]}function h({template:n,bits:e}){const r=g(n,e);return m[r]||(m[r]=b(n.vertex,n.fragment,e)),m[r]}function g(n,e){return e.map((n=>(d.has(n)||d.set(n,x++),d.get(n)))).sort(((n,e)=>n-e)).join("-")+n.vertex+n.fragment}function b(n,e,r){const o=l(n),t=l(e);return r.forEach((n=>{a(n.vertex,o,n.name),a(n.fragment,t,n.name)})),{vertex:f(n,o),fragment:f(e,t)}}const C="\n    @in aPosition: vec2<f32>;\n    @in aUV: vec2<f32>;\n\n    @out @builtin(position) vPosition: vec4<f32>;\n    @out vUV : vec2<f32>;\n    @out vColor : vec4<f32>;\n\n    {{header}}\n\n    struct VSOutput {\n        {{struct}}\n    };\n\n    @vertex\n    fn main( {{in}} ) -> VSOutput {\n\n        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;\n        var modelMatrix = mat3x3<f32>(\n            1.0, 0.0, 0.0,\n            0.0, 1.0, 0.0,\n            0.0, 0.0, 1.0\n          );\n        var position = aPosition;\n        var uv = aUV;\n\n        {{start}}\n        \n        vColor = vec4<f32>(1., 1., 1., 1.);\n\n        {{main}}\n\n        vUV = uv;\n\n        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;\n\n        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);\n       \n        vColor *= globalUniforms.uWorldColorAlpha;\n\n        {{end}}\n\n        {{return}}\n    };\n",P="\n    @in vUV : vec2<f32>;\n    @in vColor : vec4<f32>;\n   \n    {{header}}\n\n    @fragment\n    fn main(\n        {{in}}\n      ) -> @location(0) vec4<f32> {\n        \n        {{start}}\n\n        var outColor:vec4<f32>;\n      \n        {{main}}\n        \n        return outColor * vColor;\n      };\n",T="\n    in vec2 aPosition;\n    in vec2 aUV;\n\n    out vec4 vColor;\n    out vec2 vUV;\n\n    {{header}}\n\n    void main(void){\n\n        mat3 worldTransformMatrix = uWorldTransformMatrix;\n        mat3 modelMatrix = mat3(\n            1.0, 0.0, 0.0,\n            0.0, 1.0, 0.0,\n            0.0, 0.0, 1.0\n          );\n        vec2 position = aPosition;\n        vec2 uv = aUV;\n        \n        {{start}}\n        \n        vColor = vec4(1.);\n        \n        {{main}}\n        \n        vUV = uv;\n        \n        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;\n\n        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n\n        vColor *= uWorldColorAlpha;\n\n        {{end}}\n    }\n",$="\n   \n    in vec4 vColor;\n    in vec2 vUV;\n\n    out vec4 finalColor;\n\n    {{header}}\n\n    void main(void) {\n        \n        {{start}}\n\n        vec4 outColor;\n      \n        {{main}}\n        \n        finalColor = outColor * vColor;\n    }\n",M={name:"global-uniforms-bit",vertex:{header:"\n        struct GlobalUniforms {\n            uProjectionMatrix:mat3x3<f32>,\n            uWorldTransformMatrix:mat3x3<f32>,\n            uWorldColorAlpha: vec4<f32>,\n            uResolution: vec2<f32>,\n        }\n\n        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;\n        "}},U={name:"global-uniforms-bit",vertex:{header:"\n          uniform mat3 uProjectionMatrix;\n          uniform mat3 uWorldTransformMatrix;\n          uniform vec4 uWorldColorAlpha;\n          uniform vec2 uResolution;\n        "}};function S({bits:n,name:e}){const r=p({template:{fragment:P,vertex:C},bits:[M,...n]});return t.B.from({name:e,vertex:{source:r.vertex,entryPoint:"main"},fragment:{source:r.fragment,entryPoint:"main"}})}function V({bits:n,name:e}){return new o.M({name:e,...h({template:{vertex:T,fragment:$},bits:[U,...n]})})}},4459:(n,e,r)=>{r.d(e,{F:()=>o,a:()=>t});const o={name:"color-bit",vertex:{header:"\n            @in aColor: vec4<f32>;\n        ",main:"\n            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);\n        "}},t={name:"color-bit",vertex:{header:"\n            in vec4 aColor;\n        ",main:"\n            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);\n        "}}},4e3:(n,e,r)=>{r.d(e,{P:()=>s,_:()=>a});const o={};function t(n){const e=[];if(1===n)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let r=0;for(let o=0;o<n;o++)e.push(`@group(1) @binding(${r++}) var textureSource${o+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${r++}) var textureSampler${o+1}: sampler;`)}return e.join("\n")}function i(n){const e=[];if(1===n)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let r=0;r<n;r++)r===n-1?e.push("  default:{"):e.push(`  case ${r}:{`),e.push(`      outColor = textureSampleGrad(textureSource${r+1}, textureSampler${r+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join("\n")}function a(n){return o[n]||(o[n]={name:"texture-batch-bit",vertex:{header:"\n                @in aTextureIdAndRound: vec2<u32>;\n                @out @interpolate(flat) vTextureId : u32;\n            ",main:"\n                vTextureId = aTextureIdAndRound.y;\n            ",end:"\n                if(aTextureIdAndRound.x == 1)\n                {\n                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);\n                }\n            "},fragment:{header:`\n                @in @interpolate(flat) vTextureId: u32;\n\n                ${t(n)}\n            `,main:`\n                var uvDx = dpdx(vUV);\n                var uvDy = dpdy(vUV);\n\n                ${i(n)}\n            `}}),o[n]}const u={};function l(n){const e=[];for(let r=0;r<n;r++)r>0&&e.push("else"),r<n-1&&e.push(`if(vTextureId < ${r}.5)`),e.push("{"),e.push(`\toutColor = texture(uTextures[${r}], vUV);`),e.push("}");return e.join("\n")}function s(n){return u[n]||(u[n]={name:"texture-batch-bit",vertex:{header:"\n                in vec2 aTextureIdAndRound;\n                out float vTextureId;\n\n            ",main:"\n                vTextureId = aTextureIdAndRound.y;\n            ",end:"\n                if(aTextureIdAndRound.x == 1.)\n                {\n                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n                }\n            "},fragment:{header:`\n                in float vTextureId;\n\n                uniform sampler2D uTextures[${n}];\n\n            `,main:`\n\n                ${l(n)}\n            `}}),u[n]}},2067:(n,e,r)=>{r.d(e,{Ls:()=>o,_Q:()=>t,mA:()=>i});const o={name:"local-uniform-bit",vertex:{header:"\n\n            struct LocalUniforms {\n                uTransformMatrix:mat3x3<f32>,\n                uColor:vec4<f32>,\n                uRound:f32,\n            }\n\n            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;\n        ",main:"\n            vColor *= localUniforms.uColor;\n            modelMatrix *= localUniforms.uTransformMatrix;\n        ",end:"\n            if(localUniforms.uRound == 1)\n            {\n                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);\n            }\n        "}},t={...o,vertex:{...o.vertex,header:o.vertex.header.replace("group(1)","group(2)")}},i={name:"local-uniform-bit",vertex:{header:"\n\n            uniform mat3 uTransformMatrix;\n            uniform vec4 uColor;\n            uniform float uRound;\n        ",main:"\n            vColor *= uColor;\n            modelMatrix = uTransformMatrix;\n        ",end:"\n            if(uRound == 1.)\n            {\n                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n            }\n        "}}},6665:(n,e,r)=>{r.d(e,{b:()=>o,m:()=>t});const o={name:"round-pixels-bit",vertex:{header:"\n            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> \n            {\n                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n            }\n        "}},t={name:"round-pixels-bit",vertex:{header:"   \n            vec2 roundPixels(vec2 position, vec2 targetSize)\n            {       \n                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n            }\n        "}}},2760:(n,e,r)=>{function o(n,e,r){const o=(n>>24&255)/255;e[r++]=(255&n)/255*o,e[r++]=(n>>8&255)/255*o,e[r++]=(n>>16&255)/255*o,e[r++]=o}r.d(e,{V:()=>o})},8422:(n,e,r)=>{r.d(e,{K:()=>o});class o{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(n,e,r,o){const t=this.renderable,i=this.texture,a=t.groupTransform,u=a.a,l=a.b,s=a.c,c=a.d,v=a.tx,f=a.ty,m=this.bounds,d=m.maxX,x=m.minX,p=m.maxY,h=m.minY,g=i.uvs,b=t.groupColorAlpha,C=o<<16|65535&this.roundPixels;n[r+0]=u*x+s*h+v,n[r+1]=c*h+l*x+f,n[r+2]=g.x0,n[r+3]=g.y0,e[r+4]=b,e[r+5]=C,n[r+6]=u*d+s*h+v,n[r+7]=c*h+l*d+f,n[r+8]=g.x1,n[r+9]=g.y1,e[r+10]=b,e[r+11]=C,n[r+12]=u*d+s*p+v,n[r+13]=c*p+l*d+f,n[r+14]=g.x2,n[r+15]=g.y2,e[r+16]=b,e[r+17]=C,n[r+18]=u*x+s*p+v,n[r+19]=c*p+l*x+f,n[r+20]=g.x3,n[r+21]=g.y3,e[r+22]=b,e[r+23]=C}packIndex(n,e,r){n[e]=r+0,n[e+1]=r+1,n[e+2]=r+2,n[e+3]=r+0,n[e+4]=r+2,n[e+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}}}]);
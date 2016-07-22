/**
 * Created by shaopo on 2016/7/20.
 */


var _Pagination=function(obj){
    var node,totaa,paramObj;

    if(typeof obj=='object'&&obj.nodeType==1){
        node=obj;
    }else{
        throw new Error('_Pagination');
    };

    function init(total,obj){
        totaa=total;
        paramObj=obj;
        forEachNode();
        paramObj.callback();
    }
    function forEachNode(){
        node.innerHTML='';
        var oD,oPrev,oSpan,oBrek;
        oD=document.createElement('div');
        oD.className='Capge';
        oD.id='Cpage';

        oPrev=document.createElement('a');
        oPrev.className='pagesBtn';
        oPrev.id='prev';
        oPrev.innerHTML='上一页';

        oBrek=document.createElement('a');
        oBrek.className='pagesBtn';
        oBrek.id='back';
        oBrek.innerHTML='下一页';

        oSpan=document.createElement('span');
        oSpan.className='PagClickBtn';
        EachIf(oSpan,oPrev,oBrek);

        oD.appendChild(oPrev);//上一页
        oD.appendChild(oSpan);//页
        oD.appendChild(oBrek);//下一页
        node.appendChild(oD);
    }

    function shenci(){
        var total=totaa;
        var always=paramObj.always;
        var fen=Math.ceil(always/2);
        var page=paramObj.page;
        var s=1;
        var e=0;
        if(page-fen<=0){
            var abs=Math.abs(page-fen);
            if(abs+fen+page<=total&&always<=total){
                e=fen+page+abs;
            }else if(always>total){
                e=total;
            }
            if(page<1){
                paramObj.page=1;
                s=1;
            }
        }
        if(page-fen>=1){
            s=page-fen;
            if(fen+page<=total&&always<=total){
                e=fen+page-1;
            }else if(always>total){
                e=total;
            }
        }

        if(page+fen>total){
            var abs=Math.abs(total-(page+fen));
            s=page-fen-abs+1;
            if(abs+fen+page>=total&&always<=total){
                e=total;
            }
            if(page>total){
                paramObj.page=total;
                e=total;
            }
        }

        return {
            s:s,
            e:e
        }
    }

    function EachIf(oSpan,oPrev,oBrek){
        var Num=shenci();
        var boo=false;
        for(var i= Num.s,l=Num.e+1;i<l;i++){
            var oText=document.createTextNode(i);
            var oA=document.createElement('a');
            oA.href='javascript:;';
            oA.setAttribute('index',i);
            oA.appendChild(oText);
            if(paramObj.page==i){
                if(i==1&&!boo){
                    oPrev.className='pagesBtn disibled';
                    oA.className='active';
                    boo=false;
                }else if(i==l-1&&!boo){
                    oBrek.className='pagesBtn disibled';
                    oA.className='active';
                    boo=false;
                }else{
                    oA.className='active';
                }
            }
            oSpan.appendChild(oA);
        }
    }
    return init;
};
window.onload=function(){

    var oDiv=document.getElementById('content');
    var num=1;

    function fenye(num){
        _Pagination(oDiv)(20,{
            page:num ,
            always:10,
            callback:function(){
                //上一页
                var oPrev=document.getElementById('prev');
                oPrev.onclick=function(){
                    num--;
                    fenye(num);
                }
                //下一页
                var oBack=document.getElementById('back');
                oBack.onclick=function(){
                    num++;
                    fenye(num);
                }
                //所有点击按钮
                var oA=document.querySelectorAll('.PagClickBtn a');
                for(var i=0;i<oA.length;i++){
                    (function(i){
                        oA[i].onclick=function(){
                            num=parseInt(this.getAttribute('index'));
                            fenye(num);
                        }
                    })(i)
                }
            }
        });
    }
    fenye(num);

}




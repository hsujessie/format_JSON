document.addEventListener("DOMContentLoaded", ()=>{
    const processBtn = document.getElementById("process-btn");
    processBtn.addEventListener("click", function(){
        formatJson();
        setColor();
        
        //Replace all ',' with ',<br>'
        document.getElementById('formatted-json').innerHTML = document.getElementById('formatted-json').innerHTML.replace(/,/g, ',<br>');

        clikCollapse();
    });

    function formatJson() {
        let jsonValue = document.getElementById('origin-json').value;
        // Replace all '[' with '<span>[<i></i><br><span>'
        let regContent = jsonValue.replace(/([\[])/g, '<span class="square-bracket"> $1<i class="fa-regular fa-square-minus icon-color"></i><br><span class="content-span">');
        // Replace all '{' with '<span>{<i></i><br><span>'
        regContent = regContent.replace(/([\{])/g, '<span class="curly-bracket"> $1<i class="fa-regular fa-square-minus icon-color"></i><br><span class="content-span">');
        // Replace all ']' with '</span>]</span>'
        regContent = regContent.replace(/([\]])/g, '</span>$1</span>');
        // Replace all '}' with '</span>}</span>'
        regContent = regContent.replace(/([\}])/g, '</span>$1</span>');

        document.getElementById('formatted-json').innerHTML = regContent.trim();
    }
    
    function setColor() {
        let obj = JSON.parse(document.getElementById('origin-json').value);
        let elementHtml = document.getElementById('formatted-json').innerHTML;
        let valueArr = iterateObject(obj, new Array());

        for(let key in valueArr) {
            let value = valueArr[key];
            if(typeof value == 'number') {
                elementHtml = elementHtml.replace(value, '<span class="red-number">' + value + '</span>');
            }else if(typeof value == 'string') {
                elementHtml = elementHtml.replace('"'+value+'"', '<span class="blue-string">"' + value + '"</span>');
            }
        }
        document.getElementById('formatted-json').innerHTML = elementHtml;
    }

    function iterateObject(obj, valueArr) {
        for (let key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key].forEach(item => iterateObject(item, valueArr)); // Iterate over array elements recursively
            } else if (typeof obj[key] === 'object') {
                iterateObject(obj[key], valueArr); // Recursively call iterateObject for nested objects
            } else {
                valueArr.push(obj[key]);
            }
        }

        return valueArr;
    }

    function clikCollapse() {
        const icons = document.querySelectorAll('.fa-regular');
        icons.forEach(icon => {
            icon.addEventListener("click", function(e){
                let eTarget = e.target;
                let eClassList = eTarget.classList;
                let nextElement = eTarget.nextElementSibling;
                if (eClassList.contains("fa-square-minus")) {
                    eClassList.add('fa-square-plus');
                    eClassList.remove('fa-square-minus');

                    if(nextElement instanceof HTMLBRElement) {
                        nextElement.nextElementSibling.style.display = 'none';
                        nextElement.remove();
                    }
                    
                    if(nextElement instanceof HTMLSpanElement) {
                        nextElement.style.display = 'none';
                    }
                } else {
                    eClassList.add('fa-square-minus');
                    eClassList.remove('fa-square-plus');

                    if(nextElement instanceof HTMLSpanElement) {
                        nextElement.style.display = 'block';
                    }
                }
            });
        });
    }
    
});

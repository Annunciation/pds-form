    var formTabIndex = 180;
    var memNum = 1, orgMemNum = 1;
    var myWidth = 0, myHeight = 0, conf = false, errstr = "", errcaptcha = false, confkeydown = false;
    var df, ds, dow = 0;
    var tmp = '';
    var yr, mo, da = 0;
    var fndFN = new Array();
    var fndDR = new Array();
    var fndDRStart = new Array();
    var fndDREnd = new Array();
    var bw = 0;
    fndFN[0] = "5198";
    fndDR[0] = "01/01/2020 - 12/31/2020";
    fndDRStart[0] = "01/01/2020";
    fndDREnd[0] = "12/31/2020";
    fndFN[1] = "5198";
    fndDR[1] = "01/01/2019 - 12/31/2019";
    fndDRStart[1] = "01/01/2019";
    fndDREnd[1] = "12/31/2019";
    var _calendar_active_instance = {};
    window.onload = function() {
      if (document.getElementById('downloadInstead') != null)
        document.getElementById('downloadInstead').style.display = "none";
      if (document.getElementById('co-form-content') != null)
        document.getElementById('co-form-content').style.display = "";
      getBrowserSize();
      var ajaxDiv = document.createElement("div");
      ajaxDiv.id = "ajax-progressbar";
      ajaxDiv.innerHTML = "Checking with server. Please wait...";
      document.getElementById("CORegForm").appendChild(ajaxDiv);
      document.getElementById("ajax-progressbar").style.display = "none";
      document.getElementById("forxpmsie").style.display = "none";
      document.getElementById("noscriptmsg").style.display = "none";
      document.getElementById("load").style.display = "block";
      calendar.set("dteHeadBirthday");
      calendar.set("dteHeadSac1Date");
      calendar.set("dteHeadSac2Date");
      calendar.set("dteHeadSac3Date");
      calendar.set("dteSpouseBirthday");
      calendar.set("dteSpouseSac1Date");
      calendar.set("dteSpouseSac2Date");
      calendar.set("dteSpouseSac3Date");
      if (document.getElementById("dteMemberBirthday") != null)
        calendar.set("dteMemberBirthday");
      if (document.getElementById("dteMem1Birthday") != null)
        calendar.set("dteMem1Birthday");
      if (document.getElementById("dteMemberBirthday") != null)
        calendar.set("dteMemberSac1Date");
      if (document.getElementById("dteMem1Sac1Date") != null)
        calendar.set("dteMem1Sac1Date");
      if (document.getElementById("dteMemberBirthday") != null)
        calendar.set("dteMemberSac2Date");
      if (document.getElementById("dteMem1Sac2Date") != null)
        calendar.set("dteMem1Sac2Date");
      if (document.getElementById("dteMemberBirthday") != null)
        calendar.set("dteMemberSac3Date");
      if (document.getElementById("dteMem1Sac3Date") != null)
        calendar.set("dteMem1Sac3Date");
      document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $0.00';
      calendar.set("dteFund1Start");
      calendar.set("dteFund1End");
      calendar.set("dteFund2Start");
      calendar.set("dteFund2End");
      if (document.getElementById('lblidenv') != null)
        document.getElementById('lblidenv').style.display = 'none';
      if (document.getElementById('idenv') != null)
        document.getElementById('idenv').style.display = 'none';
      if (document.getElementById('txaFamIDEnv') != null)
        document.getElementById('txaFamIDEnv').style.display = 'none';
      if (document.getElementById('rbtNewRegID') != null)
        document.getElementById('rbtNewRegID').checked = false;
      if (document.getElementById('rbtEditRegID') != null)
        document.getElementById('rbtEditRegID').checked = false;
      document.onclick = documentClick;
      var currDate = new Date()
      var dd = ((currDate.getDate())>=10)? (currDate.getDate()) : '0' + (currDate.getDate());
      var mm = ((currDate.getMonth()+1)>=10)? (currDate.getMonth()+1) : '0' + (currDate.getMonth()+1);
      var yy = currDate.getFullYear();
      var currdate = mm+"/"+dd+"/"+yy;
      for (var i=1; i<fndFN.length+1; i++)
      {
        if (document.getElementById('amtRateFund'+i).value == "")
          document.getElementById('amtRateFund'+i).value = '';
        if (document.getElementById('amtTotalFund'+i).value == "")
          document.getElementById('amtTotalFund'+i).value = '';
        if (document.getElementById('dteFund'+i+'Start').value == "")
          document.getElementById('dteFund'+i+'Start').value = currdate;
      }
      if (document.getElementById('btnDelMember') != null)
        document.getElementById('btnDelMember').disabled = true;
      if (document.getElementById('captsection') != null)
        document.getElementById('captsection').style.display = "none";
      if (document.getElementById('pModal') != null)
        document.getElementById('pModal').style.display = "none";
      if (document.getElementById('fullModal') != null)
        document.getElementById('fullModal').style.display = "none";
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent.toUpperCase();
      if (((nAgt.search('WINDOWS NT 5.1')>0) ||
           (nAgt.search('WINDOWS NT 5.2')>0)) &&
          ((nAgt.search('TRIDENT/')>0) ||
           (nAgt.search('MSIE')>0)))
      {
        var elem = document.getElementById("CORegForm");
        elem.parentNode.removeChild(elem);
        document.getElementById("forxpmsie").style.display = "block";
        document.getElementById("forxpmsie").innerHTML =
        "You are using an incompatible browser on a Windows XP computer.<br>To use this registration form, download either <a title='http://www.google.com/chrome/' href='http://www.google.com/chrome/'>Chrome</a> or <a title='https://www.mozilla.org/en-US/firefox/desktop/' href='https://www.mozilla.org/en-US/firefox/desktop/'>Firefox</a> and set it as your default browser.";
      }
    };
    function GetNewCaptcha() {
      errcaptcha = false;
      if (document.getElementById('captsection') != null) {
        document.getElementById('captsection').style.display = "block";
        document.getElementById("appCaptcha").value = "";
        var x = new Date(), h = x.getHours(), m = x.getMinutes(), s = x.getSeconds();
        document.getElementById("idcaptcha").src = "https://forms.parishdata.com/PDSForms/CaptchaService/Captcha.gif?" + m + s;
        $("#idcaptcha").on("load",function(){
          errcaptcha = false;
        }).on("error", function(){
          errcaptcha = true;
          showmodal("appCaptcha", "Information", "Captcha service is not available.<br><br>Please contact your church.");
        });
      }
    }
    function showprogress(pbody,disp) {
      if (disp == true) {
        document.getElementById("pbody").innerHTML = '<div class="loader""></div><div style="padding-top: 10px;">'+pbody+'</div>';
        if ($("#pModal").css("display") == "none")
          $("#pModal").show();
      }
      else {
        $("#pModal").hide();
      }
    }
    function showmodal(ele, txthead, txtbody) {
      confkeydown = false;
      var modal = document.getElementById("fullModal");
      document.getElementById("modal-header").style.display = "block";
      document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#161;&nbsp;</span>&nbsp;&nbsp;'+txthead;
      document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
      document.getElementById("modal-footer").style.display = "none";
      document.getElementById("modbtn").style.display = "none";
      var by = document.getElementById("btnYes"), bn = document.getElementById("btnNo");
      if (txthead == "Confirmation") {
        confkeydown = true;
        document.getElementById("btnNo").style.display = "inline";
        document.getElementById("btnYes").value = "Yes";
        document.getElementById("btnNo").value = "No";
        document.getElementById("modal-footer").style.display = "block";
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#63;&nbsp;</span>&nbsp;&nbsp;'+txthead;
        document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
        modal.style.display = "block";
        by.onclick = function() {
          conf = true;
          modal.style.display = "none";
          document.getElementById("CORegForm").submit();
        }
        bn.onclick = function() {
          modal.style.display = "none";
          conf = false;
        }
      }
      else if (txthead != "Information") {
        var btn = document.getElementById(ele);
        btn.onclick = function() {
          document.getElementById("modal-footer").style.display = "block";
          document.getElementById("modheadtitle").innerHTML = '<span class="modalmark">&nbsp;&#161;&nbsp;</span>&nbsp;&nbsp;'+txthead;
          document.getElementById("modheadbody").innerHTML = '<span style="font-weight: 600;">'+txtbody+'</span>';
          modal.style.display = "block";
        }
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("btnNo").style.display = "none";
        document.getElementById("btnYes").value = "OK";
        by.onclick = function() {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      else {
        modal.style.display = "block";
        document.getElementById("modbtn").style.display = "block";
        document.getElementById("btnNo").style.display = "none";
        document.getElementById("btnYes").value = "OK";
        by.onclick = function() {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      var span = document.getElementsByClassName("closebtn")[0];
      span.onclick = function() {
        modal.style.display = "none";
        if (document.getElementById(ele) != null)
          document.getElementById(ele).focus();
      }
      window.onclick = function(event) {
        if ((event.target == modal) && (confkeydown == false)) {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
      window.onkeydown = function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if ((modal.style.display == "block") && (keyCode === 13) && (confkeydown == false)) {
          modal.style.display = "none";
          if (document.getElementById(ele) != null)
            document.getElementById(ele).focus();
        }
      }
    }
    function openNewWindow()
    {
      var popupWin = window.open('', resizable=1);
    }
    function showID()
    {
      if (document.getElementById('lblidenv') != null)
        document.getElementById('lblidenv').style.display = 'inline';
      if (document.getElementById('idenv') != null)
        document.getElementById('idenv').style.display = 'inline';
      document.getElementById('txaFamIDEnv').style.display = 'inline';
    }
    function hideID()
    {
      if (document.getElementById('lblidenv') != null)
        document.getElementById('lblidenv').style.display = 'none';
      if (document.getElementById('idenv') != null)
        document.getElementById('idenv').style.display = 'none';
      document.getElementById('txaFamIDEnv').style.display = 'none';
    }
    // display require labels
    function modifyDisplay()
    {
      if (((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==true)) ||
          ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==true))) {
        var reqLbls = document.getElementsByTagName('span');
        var i = reqLbls.length;
        while(i--)
        {
          // r0=require for new
          if (reqLbls[i].id == 'r0')
          {
            reqLbls[i].innerHTML= '&nbsp;&nbsp';
            if ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==true) && (reqLbls[i].id == 'r0'))
            {
              reqLbls[i].innerHTML = '*';
            }
          }
        }
      }
    }
    // get browser size
    function getBrowserSize()
    {
      bw = window.innerWidth;
    }
    function AddNewMem()
    {
      try
      {
        if (memNum < orgMemNum)
          memNum = orgMemNum;
        memNum = memNum+1;
        if (document.getElementById('btnDelMember') != null)
          document.getElementById('btnDelMember').disabled = false;
        var table = document.getElementById("mainTable");
        var mainTableBody = document.getElementById("mainTbody");
        var tr47 = document.createElement('tr');
        tr47.setAttribute('name', 'tr47'+memNum);
        tr47.setAttribute('id', 'tr47'+memNum);
        mainTableBody.appendChild(tr47);
        formTabIndex = formTabIndex + 1;
        var td47 = document.createElement('td');
        td47.setAttribute('id', 'td48'+memNum);
        td47.setAttribute('colspan', '2');
        tr47.appendChild(td47);
        var rx = new RegExp("[0-9]", "g");
        var s = "Member 1", res = "Member 1";
        if (rx.test(s) === true) {
          res = s.replace(rx, memNum);
        }
        td47.innerHTML = '<input type="button" name="btnMember'+memNum+'Btn" id="btnMember'+memNum+'Btn" title="Toggle Member '+memNum+' Section" value="Hide" onclick="toggleMember('+memNum+')" style="width:80px" class="btnstyle" />&nbsp;&nbsp;<span class="titlelbl">'+res+'</span>';
        var td48 = document.createElement('td');
        td48.setAttribute('id', 'td48'+memNum);
        tr47.appendChild(td48);
        td48.innerHTML = '<span class="lbl" id="labelMem'+memNum+'Type">Type</span>';
        var td49 = document.createElement('td');
        td49.setAttribute('id', 'td49'+memNum);
        tr47.appendChild(td49);
        td49.innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Type" id="cboMem'+memNum+'Type" style="width:110px" title="Select a type in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="2">Adult</option>'+
          '<option value="3">Young Adult</option>'+
          '<option value="4">Child</option>'+
          '<option value="5">Other</option>'+
          '</select>'+
          '</td>';
        var tr48 = document.createElement('tr');
        tr48.setAttribute('name', 'tr48'+memNum);
        tr48.setAttribute('id', 'tr48'+memNum);
        mainTableBody.appendChild(tr48);
        formTabIndex = formTabIndex + 1;
        tr48.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspTitle</span></td>';
        tr48.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Title" id="cboMem'+memNum+'Title" style="" title="Select a title in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="">None</option>'+
          '<option value="Mr.">Mr.</option>'+
          '<option value="Ms.">Ms.</option>'+
          '<option value="Mrs.">Mrs.</option>'+
          '<option value="Miss">Miss</option>'+
          '<option value="Dr.">Dr.</option>'+
          '<option value="Fr.">Fr.</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Rev.">Rev.</option>'+
          '<option value="Deacon">Deacon</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Sra">Sra</option>'+
          '<option value="M/M">M/M</option>'+
          '<option value="M/M">M/M</option>'+
          '<option value="D/M">D/M</option>'+
          '<option value="D/M">D/M</option>'+
          '<option value="M/D">M/D</option>'+
          '<option value="M/D">M/D</option>'+
          '<option value="D/D">D/D</option>'+
          '<option value="D/D">D/D</option>'+
          '<option value="S/S">S/S</option>'+
          '<option value="S/S">S/S</option>'+
          '<option value="Abbess">Abbess</option>'+
          '<option value="Abbot">Abbot</option>'+
          '<option value="Archbishop">Archbishop</option>'+
          '<option value="Archbishop">Archbishop</option>'+
          '<option value="Archimandr">Archimandr</option>'+
          '<option value="Archimandr">Archimandr</option>'+
          '<option value="Bishop">Bishop</option>'+
          '<option value="Deacon">Deacon</option>'+
          '<option value="Deacon">Deacon</option>'+
          '<option value="Ecu Pat">Ecu Pat</option>'+
          '<option value="Metropolit">Metropolit</option>'+
          '<option value="Monk">Monk</option>'+
          '<option value="Nun">Nun</option>'+
          '<option value="Patriarch">Patriarch</option>'+
          '<option value="Presbyter">Presbyter</option>'+
          '<option value="Presbyter">Presbyter</option>'+
          '<option value="Titular B">Titular B</option>'+
          '<option value="Titular M">Titular M</option>'+
          '<option value="Adm">Adm</option>'+
          '<option value="Amn">Amn</option>'+
          '<option value="A1C">A1C</option>'+
          '<option value="BG">BG</option>'+
          '<option value="BG">BG</option>'+
          '<option value="BG">BG</option>'+
          '<option value="Cpt">Cpt</option>'+
          '<option value="Cpt">Cpt</option>'+
          '<option value="Cpt">Cpt</option>'+
          '<option value="Cpt">Cpt</option>'+
          '<option value="CMSgt">CMSgt</option>'+
          '<option value="Col">Col</option>'+
          '<option value="Col">Col</option>'+
          '<option value="Col">Col</option>'+
          '<option value="CSM">CSM</option>'+
          '<option value="Cmdr">Cmdr</option>'+
          '<option value="Cdr">Cdr</option>'+
          '<option value="Como">Como</option>'+
          '<option value="CPL">CPL</option>'+
          '<option value="Ens">Ens</option>'+
          '<option value="1Lt">1Lt</option>'+
          '<option value="1Lt">1Lt</option>'+
          '<option value="1Lt">1Lt</option>'+
          '<option value="1SG">1SG</option>'+
          '<option value="1st Sgt">1st Sgt</option>'+
          '<option value="Gen">Gen</option>'+
          '<option value="Gen">Gen</option>'+
          '<option value="Gen">Gen</option>'+
          '<option value="GySgt">GySgt</option>'+
          '<option value="LCpl">LCpl</option>'+
          '<option value="Lt">Lt</option>'+
          '<option value="Ltc">Ltc</option>'+
          '<option value="Ltc">Ltc</option>'+
          '<option value="Ltc">Ltc</option>'+
          '<option value="LCdr">LCdr</option>'+
          '<option value="Ltg">Ltg</option>'+
          '<option value="Ltg">Ltg</option>'+
          '<option value="Ltg">Ltg</option>'+
          '<option value="LtJG">LtJG</option>'+
          '<option value="Maj">Maj</option>'+
          '<option value="Maj">Maj</option>'+
          '<option value="Maj">Maj</option>'+
          '<option value="MG">MG</option>'+
          '<option value="MG">MG</option>'+
          '<option value="MG">MG</option>'+
          '<option value="MGySgt">MGySgt</option>'+
          '<option value="MSG">MSG</option>'+
          '<option value="MSgt">MSgt</option>'+
          '<option value="MSgt">MSgt</option>'+
          '<option value="Pres.">Pres.</option>'+
          '<option value="Pres.">Pres.</option>'+
          '<option value="PPres.">PPres.</option>'+
          '<option value="PSG">PSG</option>'+
          '<option value="PVT">PVT</option>'+
          '<option value="PVT">PVT</option>'+
          '<option value="PFC">PFC</option>'+
          '<option value="PFC">PFC</option>'+
          '<option value="RAdm">RAdm</option>'+
          '<option value="RDML">RDML</option>'+
          '<option value="2Lt">2Lt</option>'+
          '<option value="2Lt">2Lt</option>'+
          '<option value="2Lt">2Lt</option>'+
          '<option value="SMSgt">SMSgt</option>'+
          '<option value="SGT">SGT</option>'+
          '<option value="SFC">SFC</option>'+
          '<option value="SGM">SGM</option>'+
          '<option value="SMA">SMA</option>'+
          '<option value="SP4">SP4</option>'+
          '<option value="SrA">SrA</option>'+
          '<option value="SSgt">SSgt</option>'+
          '<option value="SSgt">SSgt</option>'+
          '<option value="SSG">SSG</option>'+
          '<option value="TSgt">TSgt</option>'+
          '<option value="WO">WO</option>'+
          '<option value="WO">WO</option>'+
          '<option value="WO">WO</option>'+
          '<option value="CWO2">CWO2</option>'+
          '<option value="CWO3">CWO3</option>'+
          '<option value="CWO4">CWO4</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr48.insertCell(2).innerHTML = '<td><span class="lbl">Suffix</span></td>';
        tr48.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Suffix" id="cboMem'+memNum+'Suffix" style="width:75px" title="Select a suffix in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="">None</option>'+
          '<option value="Sr.">Sr.</option>'+
          '<option value="Jr.">Jr.</option>'+
          '<option value="II">II</option>'+
          '<option value="III">III</option>'+
          '<option value="IV">IV</option>'+
          '<option value="V">V</option>'+
          '<option value="VI">VI</option>'+
          '<option value="VII">VII</option>'+
          '<option value="VIII">VIII</option>'+
          '<option value="XV">XV</option>'+
          '<option value="X">X</option>'+
          '</select>'+
          '</td>';
        var tr49 = document.createElement('tr');
        tr49.setAttribute('name', 'tr49'+memNum);
        tr49.setAttribute('id', 'tr49'+memNum);
        mainTableBody.appendChild(tr49);
        formTabIndex = formTabIndex + 1;
        tr49.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;First Name</span></td>';
        tr49.insertCell(1).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter first name here" name="txaMem'+memNum+'FirstName" id="txaMem'+memNum+'FirstName" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr49.insertCell(2).innerHTML = '<td><span class="lbl">Last Name</span></td>';
        tr49.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter last name here" name="txaMem'+memNum+'LastName" id="txaMem'+memNum+'LastName" class="textboxstyle" /></td>';
        var tr50 = document.createElement('tr');
        tr50.setAttribute('name', 'tr50'+memNum);
        tr50.setAttribute('id', 'tr50'+memNum);
        mainTableBody.appendChild(tr50);
        formTabIndex = formTabIndex + 1;
        tr50.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspMiddle Name</span></td>';
        tr50.insertCell(1).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter middle name here" name="txaMem'+memNum+'MidName" id="txaMem'+memNum+'MidName" class="textboxstyle" /></td>';
        formTabIndex = formTabIndex + 1;
        tr50.insertCell(2).innerHTML = '<td><span class="lbl">Nickname</span></td>';
        tr50.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter nickname here" name="txaMem'+memNum+'Nickname" id="txaMem'+memNum+'Nickname" class="textboxstyle" /></td>';
        var tr51 = document.createElement('tr');
        tr51.setAttribute('name', 'tr51'+memNum);
        tr51.setAttribute('id', 'tr51'+memNum);
        mainTableBody.appendChild(tr51);
        formTabIndex = formTabIndex + 1;
        tr51.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspRelationship</span></td>';
        tr51.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Relationship" id="cboMem'+memNum+'Relationship" style="" title="select a relationship in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Adopted">Adopted</option>'+
          '<option value="Adult">Adult</option>'+
          '<option value="Aunt">Aunt</option>'+
          '<option value="Brother">Brother</option>'+
          '<option value="Child">Child</option>'+
          '<option value="Cousin">Cousin</option>'+
          '<option value="Daughter">Daughter</option>'+
          '<option value="Father">Father</option>'+
          '<option value="Foster">Foster</option>'+
          '<option value="Friend">Friend</option>'+
          '<option value="Grandchild">Grandchild</option>'+
          '<option value="Granddaughter">Granddaughter</option>'+
          '<option value="Grandfather">Grandfather</option>'+
          '<option value="Grandmother">Grandmother</option>'+
          '<option value="Grandson">Grandson</option>'+
          '<option value="Head">Head</option>'+
          '<option value="Head 2">Head 2</option>'+
          '<option value="Head-Female">Head-Female</option>'+
          '<option value="Head-Male">Head-Male</option>'+
          '<option value="Husband">Husband</option>'+
          '<option value="In-Law">In-Law</option>'+
          '<option value="Mother">Mother</option>'+
          '<option value="Nephew">Nephew</option>'+
          '<option value="Niece">Niece</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Parents">Parents</option>'+
          '<option value="Sister">Sister</option>'+
          '<option value="Son">Son</option>'+
          '<option value="Spouse">Spouse</option>'+
          '<option value="Stepchild">Stepchild</option>'+
          '<option value="Stepdaughter">Stepdaughter</option>'+
          '<option value="Stepfather">Stepfather</option>'+
          '<option value="Stepmother">Stepmother</option>'+
          '<option value="Stepson">Stepson</option>'+
          '<option value="Uncle">Uncle</option>'+
          '<option value="Unknown">Unknown</option>'+
          '<option value="Wife">Wife</option>'+
          '<option value="Young Adult">Young Adult</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr51.insertCell(2).innerHTML = '<td><span class="lbl">Maiden Name</span></td>';
        tr51.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="100" style="" title="Please enter maiden name" name="txaMem'+memNum+'MaidName" id="txaMem'+memNum+'MaidName" class="textboxstyle" /></td>';
        var tr52 = document.createElement('tr');
        tr52.setAttribute('name', 'tr52'+memNum);
        tr52.setAttribute('id', 'tr52'+memNum);
        mainTableBody.appendChild(tr52);
        formTabIndex = formTabIndex + 1;
        tr52.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspEthnicity</span></td>';
        tr52.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Ethnicity" id="cboMem'+memNum+'Ethnicity" style="" title="select an ethnicity in the pull down list" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Albanian">Albanian</option>'+
          '<option value="American">American</option>'+
          '<option value="Chinese">Chinese</option>'+
          '<option value="Egyptian">Egyptian</option>'+
          '<option value="French">French</option>'+
          '<option value="German">German</option>'+
          '<option value="Greek">Greek</option>'+
          '<option value="Italian">Italian</option>'+
          '<option value="Japanese">Japanese</option>'+
          '<option value="Lebanese">Lebanese</option>'+
          '<option value="Polish">Polish</option>'+
          '<option value="Romanian">Romanian</option>'+
          '<option value="Russian">Russian</option>'+
          '<option value="Serbian">Serbian</option>'+
          '<option value="Ukranian">Ukranian</option>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr52.insertCell(2).innerHTML = '<td><span class="lbl">Birth Date</span></td>';
        tr52.insertCell(3).innerHTML = '<td><input tabindex="'+formTabIndex+'" maxlength="10" style="width:85px" autocomplete="off" value="mm/dd/yyyy" title="Please select a birth date" name="dteMem'+memNum+'Birthday" id="dteMem'+memNum+'Birthday" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" /></td>';
        calendar.set('dteMem'+memNum+'Birthday');
        var tr53 = document.createElement('tr');
        tr53.setAttribute('name', 'tr53'+memNum);
        tr53.setAttribute('id', 'tr53'+memNum);
        mainTableBody.appendChild(tr53);
        formTabIndex = formTabIndex + 1;
        tr53.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspGender</span>';
        tr53.insertCell(1).innerHTML = '<td><input tabindex="'+formTabIndex+'" type="radio" title="select member gender" name="rbtMem'+memNum+'Gender" id="rbtMem'+memNum+'GenderMale" value="0" class="rbtnstyle" /><span class="lbl"> Female</span>&nbsp;&nbsp;<input tabindex="'+(formTabIndex+1)+'" type="radio" title="select member gender" name="rbtMem'+memNum+'Gender" id="rbtMem'+memNum+'GenderFemale" value="1" class="rbtnstyle" /><span class="lbl"> Male</span></td>';
        formTabIndex = formTabIndex + 2;
        formTabIndex = formTabIndex + 1;
        tr53.insertCell(2).innerHTML = '<td><span class="lbl">Grade/Degree</span></td>';
        tr53.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Grade" id="cboMem'+memNum+'Grade" title="select a grade/degree in the pull down list" style="width:110px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Pre-K">Pre-K</option>'+
          '<option value="Kindergarten">Kindergarten</option>'+
          '<option value="1st">1st</option>'+
          '<option value="2nd">2nd</option>'+
          '<option value="3rd">3rd</option>'+
          '<option value="4th">4th</option>'+
          '<option value="5th">5th</option>'+
          '<option value="6th">6th</option>'+
          '<option value="7th">7th</option>'+
          '<option value="8th">8th</option>'+
          '<option value="9th">9th</option>'+
          '<option value="10th">10th</option>'+
          '<option value="11th">11th</option>'+
          '<option value="12th">12th</option>'+
          '<option value="High School">High School</option>'+
          '<option value="GED">GED</option>'+
          '<option value="College Freshman">College Freshman</option>'+
          '<option value="College Sophomore">College Sophomore</option>'+
          '<option value="College Junior">College Junior</option>'+
          '<option value="College Senior">College Senior</option>'+
          '<option value="Associates">Associates</option>'+
          '<option value="B.S.">B.S.</option>'+
          '<option value="J.D.">J.D.</option>'+
          '<option value="M.S.">M.S.</option>'+
          '<option value="M.D.">M.D.</option>'+
          '<option value="Ph.D.">Ph.D.</option>'+
          '<option value="Sc.D.">Sc.D.</option>'+
          '<option value="DDS">DDS</option>'+
          '<option value="BA">BA</option>'+
          '<option value="MA">MA</option>'+
          '<option value="MBA">MBA</option>'+
          '<option value="MDiv">MDiv</option>'+
          '</select>'+
          '</td>';
        var tr54 = document.createElement('tr');
        tr54.setAttribute('name', 'tr54'+memNum);
        tr54.setAttribute('id', 'tr54'+memNum);
        mainTableBody.appendChild(tr54);
        formTabIndex = formTabIndex + 1;
        tr54.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbspLanguage</span></td>';
        tr54.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Lang1" id="cboMem'+memNum+'Lang1" title="select a language in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '</select>'+
          '</td>';
        formTabIndex = formTabIndex + 1;
        tr54.insertCell(2).innerHTML = '<td><span class="lbl">Marital Status</span></td>';
        tr54.insertCell(3).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Mary" id="cboMem'+memNum+'Mary" title="select a marital status in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="100">100</option>'+
          '<option value="Child">Child</option>'+
          '<option value="Divorced">Divorced</option>'+
          '<option value="Divorced, Ecclesiastically">Divorced, Ecclesiastically</option>'+
          '<option value="Engaged">Engaged</option>'+
          '<option value="Married">Married</option>'+
          '<option value="Married, Civilly">Married, Civilly</option>'+
          '<option value="Married, Ecclesiastically">Married, Ecclesiastically</option>'+
          '<option value="Separated">Separated</option>'+
          '<option value="Single Adult">Single Adult</option>'+
          '<option value="Single Parent">Single Parent</option>'+
          '<option value="Unknown">Unknown</option>'+
          '<option value="Widow">Widow</option>'+
          '<option value="Widowed">Widowed</option>'+
          '<option value="Widower">Widower</option>'+
          '</select>'+
          '</td>';
        var tr55 = document.createElement('tr');
        tr55.setAttribute('name', 'tr55'+memNum);
        tr55.setAttribute('id', 'tr55'+memNum);
        mainTableBody.appendChild(tr55);
        formTabIndex = formTabIndex + 1;
        tr55.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Religion</span></td>';
        tr55.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" title="select a religion in the pull down list" name="cboMem'+memNum+'KW1" id="cboMem'+memNum+'KW1" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Armenian Orthodox">Armenian Orthodox</option>'+
          '<option value="Assembly of God">Assembly of God</option>'+
          '<option value="Baptist">Baptist</option>'+
          '<option value="Blank">Blank</option>'+
          '<option value="Buddhist">Buddhist</option>'+
          '<option value="Catholic">Catholic</option>'+
          '<option value="Christian">Christian</option>'+
          '<option value="Christian Ortho">Christian Ortho</option>'+
          '<option value="Church of God">Church of God</option>'+
          '<option value="Congregational">Congregational</option>'+
          '<option value="Coptic Orthodox">Coptic Orthodox</option>'+
          '<option value="Eastern Rite Catholic">Eastern Rite Catholic</option>'+
          '<option value="Episcopalian">Episcopalian</option>'+
          '<option value="Evangelical">Evangelical</option>'+
          '<option value="Greek Ortho">Greek Ortho</option>'+
          '<option value="Greek Orthodox">Greek Orthodox</option>'+
          '<option value="Hindu">Hindu</option>'+
          '<option value="Jehova Witness">Jehova Witness</option>'+
          '<option value="Jewish">Jewish</option>'+
          '<option value="Lds">Lds</option>'+
          '<option value="Lutheran">Lutheran</option>'+
          '<option value="Methodist">Methodist</option>'+
          '<option value="Muslim">Muslim</option>'+
          '<option value="Nazarene">Nazarene</option>'+
          '<option value="Non-Denominational">Non-Denominational</option>'+
          '<option value="None">None</option>'+
          '<option value="Orthodox">Orthodox</option>'+
          '<option value="Orthodox Christian">Orthodox Christian</option>'+
          '<option value="Orthodox non-canonical">Orthodox non-canonical</option>'+
          '<option value="Orthodox Penitent">Orthodox Penitent</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Other Christian">Other Christian</option>'+
          '<option value="Pentecostal">Pentecostal</option>'+
          '<option value="Presbyterian">Presbyterian</option>'+
          '<option value="Protestant">Protestant</option>'+
          '<option value="Roman Catholic">Roman Catholic</option>'+
          '</select>'+
          '</td>';
        var tr56 = document.createElement('tr');
        tr56.setAttribute('name', 'tr56'+memNum);
        tr56.setAttribute('id', 'tr56'+memNum);
        mainTableBody.appendChild(tr56);
        formTabIndex = formTabIndex + 1;
        tr56.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Spec Needs</span></td>';
        tr56.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" title="select a specneeds in the pull down list" name="cboMem'+memNum+'KW2" id="cboMem'+memNum+'KW2" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Arthritic">Arthritic</option>'+
          '<option value="Asthmatic">Asthmatic</option>'+
          '<option value="Cerebral Palsy">Cerebral Palsy</option>'+
          '<option value="Developmentally Disabled">Developmentally Disabled</option>'+
          '<option value="Emphysema">Emphysema</option>'+
          '<option value="Hearing Impaired">Hearing Impaired</option>'+
          '<option value="Mobility Impaired">Mobility Impaired</option>'+
          '<option value="Multiple Sclerosis">Multiple Sclerosis</option>'+
          '<option value="Other">Other</option>'+
          '<option value="Visually Impaired">Visually Impaired</option>'+
          '<option value="Wheel Chair">Wheel Chair</option>'+
          '</select>'+
          '</td>';
        var tr57 = document.createElement('tr');
        tr57.setAttribute('name', 'tr57'+memNum);
        tr57.setAttribute('id', 'tr57'+memNum);
        mainTableBody.appendChild(tr57);
        formTabIndex = formTabIndex + 1;
        tr57.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Occupation</span></td>';
        tr57.insertCell(1).innerHTML = '<td>'+
          '<select tabindex="'+formTabIndex+'" title="select a occupation in the pull down list" name="cboMem'+memNum+'KW3" id="cboMem'+memNum+'KW3" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Accounting/Bookkeeping">Accounting/Bookkeeping</option>'+
          '<option value="Administrator">Administrator</option>'+
          '<option value="Air Conditioning">Air Conditioning</option>'+
          '<option value="Apartment Manager">Apartment Manager</option>'+
          '<option value="Attorney">Attorney</option>'+
          '<option value="Auto Mechanic">Auto Mechanic</option>'+
          '<option value="Auto/Body Painting">Auto/Body Painting</option>'+
          '<option value="Baker">Baker</option>'+
          '<option value="Banking">Banking</option>'+
          '<option value="Barber">Barber</option>'+
          '<option value="Bartender">Bartender</option>'+
          '<option value="Beautician">Beautician</option>'+
          '<option value="Bricklayer">Bricklayer</option>'+
          '<option value="Bus Driver">Bus Driver</option>'+
          '<option value="Business Manager">Business Manager</option>'+
          '<option value="Butcher">Butcher</option>'+
          '<option value="Buyer">Buyer</option>'+
          '<option value="Carpenter">Carpenter</option>'+
          '<option value="Clerical/Secretary">Clerical/Secretary</option>'+
          '<option value="College Professor">College Professor</option>'+
          '<option value="Computer / Technical Support">Computer / Technical Support</option>'+
          '<option value="Construction">Construction</option>'+
          '<option value="Dentist">Dentist</option>'+
          '<option value="Doctor">Doctor</option>'+
          '<option value="Educator">Educator</option>'+
          '<option value="Electrician">Electrician</option>'+
          '<option value="Financial Analyst">Financial Analyst</option>'+
          '<option value="Financial Services">Financial Services</option>'+
          '<option value="Florist">Florist</option>'+
          '<option value="Homemaker">Homemaker</option>'+
          '<option value="Insurance">Insurance</option>'+
          '<option value="Interior Design">Interior Design</option>'+
          '<option value="Journalist">Journalist</option>'+
          '<option value="Laborer">Laborer</option>'+
          '<option value="Law Enforcement">Law Enforcement</option>'+
          '<option value="Lawyer">Lawyer</option>'+
          '<option value="Legal Secretary">Legal Secretary</option>'+
          '<option value="Manager Or Official (Business,">Manager Or Official (Business,</option>'+
          '<option value="Mechanic">Mechanic</option>'+
          '<option value="Military">Military</option>'+
          '<option value="Nurse">Nurse</option>'+
          '<option value="Office Manager">Office Manager</option>'+
          '<option value="Professional (Accountant, Teac">Professional (Accountant, Teac</option>'+
          '<option value="Receptionist">Receptionist</option>'+
          '<option value="Restauranteur">Restauranteur</option>'+
          '<option value="Retired">Retired</option>'+
          '<option value="Sales">Sales</option>'+
          '<option value="Sales Person (Real Estate, Mer">Sales Person (Real Estate, Mer</option>'+
          '<option value="Self Employed">Self Employed</option>'+
          '<option value="Software Engineer">Software Engineer</option>'+
          '<option value="Speech Pathologist">Speech Pathologist</option>'+
          '<option value="Student">Student</option>'+
          '<option value="Teacher">Teacher</option>'+
          '<option value="Teacher\'S Aide">Teacher\'S Aide</option>'+
          '<option value="Technician">Technician</option>'+
          '<option value="Technician (Computer Operator,">Technician (Computer Operator,</option>'+
          '<option value="Truck Driver">Truck Driver</option>'+
          '<option value="Unemployed">Unemployed</option>'+
          '<option value="Unknown">Unknown</option>'+
          '<option value="Waitress">Waitress</option>'+
          '</select>'+
          '</td>';
        var tr58 = document.createElement('tr');
        tr58.setAttribute('name', 'tr58'+memNum);
        tr58.setAttribute('id', 'tr58'+memNum);
        mainTableBody.appendChild(tr58);
        tr58.insertCell(0).innerHTML = '<td></td>';
        var td58 = document.createElement('td');
        td58.setAttribute('id', 'td58'+memNum);
        td58.setAttribute('colspan', '5');
        tr58.appendChild(td58);
        td58.innerHTML = '<span class="lbl">Note: If you would like to receive a text message when your parish sends a quick communication, select your provider from the Description drop-down list. Standard text messaging rates apply.</span>'
        var tr59 = document.createElement('tr');
        tr59.setAttribute('name', 'tr59'+memNum);
        tr59.setAttribute('id', 'tr59'+memNum);
        mainTableBody.appendChild(tr59);
        formTabIndex = formTabIndex + 1;
        tr59.insertCell(0).innerHTML = '<td><span class="lbl">&nbsp;&nbsp;Phone 1</span></td>';
        var td59 = document.createElement('td');
        td59.setAttribute('id', 'td59'+memNum);
        tr59.appendChild(td59);
        td59.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Phone1Type" id="cboMem'+memNum+'Phone1Type" title="select a phone type in the pull down list" style="width:120px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Ans Serv">Ans Serv</option>'+
          '<option value="Bus Ph">Bus Ph</option>'+
          '<option value="Car">Car</option>'+
          '<option value="Cell">Cell</option>'+
          '<option value="Cellular">Cellular</option>'+
          '<option value="Emerg.">Emerg.</option>'+
          '<option value="Fax">Fax</option>'+
          '<option value="Home">Home</option>'+
          '<option value="Home Ph.">Home Ph.</option>'+
          '<option value="Office">Office</option>'+
          '<option value="Pager">Pager</option>'+
          '<option value="Rehab Center">Rehab Center</option>'+
          '<option value="Sch Ofc">Sch Ofc</option>'+
          '<option value="Tdd">Tdd</option>'+
          '<option value="Text-Alltel">Text-Alltel</option>'+
          '<option value="Text-At&T">Text-At&T</option>'+
          '<option value="Text-BellSouth">Text-BellSouth</option>'+
          '<option value="Text-Boost Mobile">Text-Boost Mobile</option>'+
          '<option value="Text-Cingular">Text-Cingular</option>'+
          '<option value="Text-Cricket Mobile">Text-Cricket Mobile</option>'+
          '<option value="Text-Hawaiian Telcom">Text-Hawaiian Telcom</option>'+
          '<option value="Text-MetroPcs">Text-MetroPcs</option>'+
          '<option value="Text-Nextel">Text-Nextel</option>'+
          '<option value="Text-Page Plus">Text-Page Plus</option>'+
          '<option value="Text-Qwest Wireless">Text-Qwest Wireless</option>'+
          '<option value="Text-Revol">Text-Revol</option>'+
          '<option value="Text-Simple Mobile">Text-Simple Mobile</option>'+
          '<option value="Text-Sprint">Text-Sprint</option>'+
          '<option value="Text-Straight Talk">Text-Straight Talk</option>'+
          '<option value="Text-SunCom">Text-SunCom</option>'+
          '<option value="Text-Ting">Text-Ting</option>'+
          '<option value="Text-T-Mobile">Text-T-Mobile</option>'+
          '<option value="Text-Us Cellular">Text-Us Cellular</option>'+
          '<option value="Text-Usa Mobility">Text-Usa Mobility</option>'+
          '<option value="Text-Verizon">Text-Verizon</option>'+
          '<option value="Text-Virgin Mobile">Text-Virgin Mobile</option>'+
          '<option value="Text-Voyager Mobile">Text-Voyager Mobile</option>'+
          '<option value="Work">Work</option>'+
          '<option value="Other">Other</option>'+
          '</select>'
        var td59 = document.createElement('td');
        td59.setAttribute('id', 'td59'+memNum);
        td59.setAttribute('colspan', '2');
        tr59.appendChild(td59);
        td59.innerHTML = 
          ' ( <input tabindex="'+(formTabIndex+1)+'" maxlength="3" style="width:30px" title="enter phone area code" name="txnMem'+memNum+'Phone1Num1" id="txnMem'+memNum+'Phone1Num1" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone1Num2)" class="textboxstyle" /> ) '+
          '<input tabindex="'+(formTabIndex+2)+'" maxlength="3" style="width:30px" title="enter phone prefix" name="txnMem'+memNum+'Phone1Num2" id="txnMem'+memNum+'Phone1Num2" onkeyup="autoTab(this, document.CORegForm.txnMem'+memNum+'Phone1Num3)" class="textboxstyle" /> -'+
          '<input tabindex="'+(formTabIndex+3)+'" maxlength="4" style="width:50px" title="enter phone line number" name="txnMem'+memNum+'Phone1Num3" id="txnMem'+memNum+'Phone1Num3" class="textboxstyle" />'+
          '<input tabindex="'+(formTabIndex+4)+'" type="checkbox" name="cbxMem'+memNum+'Phone1Unl" id="cbxMem'+memNum+'Phone1Unl" class="chkboxstyle" /><span class="lbl"> Unlisted</span>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr60 = document.createElement('tr');
        tr60.setAttribute('name', 'tr60'+memNum);
        tr60.setAttribute('id', 'tr60'+memNum);
        mainTableBody.appendChild(tr60);
        tr60.insertCell(0).innerHTML = '<td><span class="titlelbl">Sacraments</span></td>';
        formTabIndex = formTabIndex + 1;
        var tr61 = document.createElement('tr');
        tr61.setAttribute('name', 'tr61'+memNum);
        tr61.setAttribute('id', 'tr61'+memNum);
        mainTableBody.appendChild(tr61);
        var td61 = document.createElement('td');
        td61.setAttribute('id', 'td61'+memNum);
        tr61.appendChild(td61);
        td61.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Baptism</span><input type="hidden" name="txaMem'+memNum+'Sac1Name" id="txaMem'+memNum+'Sac1Name" value="Baptism" />';
        var td62 = document.createElement('td');
        td62.setAttribute('id', 'td62'+memNum);
        td62.setAttribute('colspan', '1');
        tr61.appendChild(td62);
        td62.innerHTML = ' <select tabindex="161" name="cboMember'+memNum+'Sac1" id="cboMember'+memNum+'Sac1" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td63 = document.createElement('td');
        td63.setAttribute('id', 'td63'+memNum);
        td63.setAttribute('colspan', '1');
        tr61.appendChild(td63);
        td63.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" autocomplete="off" value="mm/dd/yyyy" title="enter the baptism date" name="dteMem'+memNum+'Sac1Date" id="dteMem'+memNum+'Sac1Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac1Date');
        formTabIndex = formTabIndex + 1;
        var td64 = document.createElement('td');
        td64.setAttribute('id', 'td64'+memNum);
        td64.setAttribute('colspan', '2');
        tr61.appendChild(td64);
        td64.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac1Place" id="cboMem'+memNum+'Sac1Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="All Holy Spirit Church      Omaha, NE      68127-3549">All Holy Spirit Church      Omaha, NE      68127-3549</option>'+
          '<option value="All St s Church      Canonsburg, PA      15317-2437">All St s Church      Canonsburg, PA      15317-2437</option>'+
          '<option value="All St s Church      Joliet, IL      60435-7498">All St s Church      Joliet, IL      60435-7498</option>'+
          '<option value="All St s Church      Peoria, IL      61603-3329">All St s Church      Peoria, IL      61603-3329</option>'+
          '<option value="All St s Church      Weirton, WV      26062-0128">All St s Church      Weirton, WV      26062-0128</option>'+
          '<option value="Annunciation &amp; Agia Paraskevi Church      New Buffalo, MI      49117-0093">Annunciation &amp; Agia Paraskevi Church      New Buffalo, MI      49117-0093</option>'+
          '<option value="Annunciation Cathedral      Atlanta, GA      30329-2709">Annunciation Cathedral      Atlanta, GA      30329-2709</option>'+
          '<option value="Annunciation Cathedral      Baltimore, MD      21201-5700">Annunciation Cathedral      Baltimore, MD      21201-5700</option>'+
          '<option value="Annunciation Cathedral      Brookline, MA      02445-7414">Annunciation Cathedral      Brookline, MA      02445-7414</option>'+
          '<option value="Annunciation Cathedral      Chicago, IL      60610-2699">Annunciation Cathedral      Chicago, IL      60610-2699</option>'+
          '<option value="Annunciation Cathedral      Columbus, OH      43215-2068">Annunciation Cathedral      Columbus, OH      43215-2068</option>'+
          '<option value="Annunciation Cathedral      Detroit, MI      48226-2990">Annunciation Cathedral      Detroit, MI      48226-2990</option>'+
          '<option value="Annunciation Cathedral      Housto, TX      77006-4326">Annunciation Cathedral      Housto, TX      77006-4326</option>'+
          '<option value="Annunciation Cathedral      Norfolk, VA      23505-4002">Annunciation Cathedral      Norfolk, VA      23505-4002</option>'+
          '<option value="Annunciation Cathedral      San Francisco, CA      94103-2320">Annunciation Cathedral      San Francisco, CA      94103-2320</option>'+
          '<option value="Annunciation Church      Akron, OH      44304-1518">Annunciation Church      Akron, OH      44304-1518</option>'+
          '<option value="Annunciation Church      Brockton, MA      02301-1340">Annunciation Church      Brockton, MA      02301-1340</option>'+
          '<option value="Annunciation Church      Buffalo, NY      14222-2018">Annunciation Church      Buffalo, NY      14222-2018</option>'+
          '<option value="Annunciation Church      Chattanooga, TN      37404-1104">Annunciation Church      Chattanooga, TN      37404-1104</option>'+
          '<option value="Annunciation Church      Cleveland, OH      44113-3609">Annunciation Church      Cleveland, OH      44113-3609</option>'+
          '<option value="Annunciation Church      Cranston, RI      02920-9320">Annunciation Church      Cranston, RI      02920-9320</option>'+
          '<option value="Annunciation Church      Dayton, OH      45405-4705">Annunciation Church      Dayton, OH      45405-4705</option>'+
          '<option value="Annunciation Church      Decatur, IL      62522-2126">Annunciation Church      Decatur, IL      62522-2126</option>'+
          '<option value="Annunciation Church      Dover, NH      03820-3753">Annunciation Church      Dover, NH      03820-3753</option>'+
          '<option value="Annunciation Church      Elkins Park, PA      19027-2306">Annunciation Church      Elkins Park, PA      19027-2306</option>'+
          '<option value="Annunciation Church      Fort Myers, FL      33919-5116">Annunciation Church      Fort Myers, FL      33919-5116</option>'+
          '<option value="Annunciation Church      Kalamazoo, MI      49007-5053">Annunciation Church      Kalamazoo, MI      49007-5053</option>'+
          '<option value="Annunciation Church      Kankakee, IL      60901-3761">Annunciation Church      Kankakee, IL      60901-3761</option>'+
          '<option value="Annunciation Church      Kansas City, MO      64145-1116">Annunciation Church      Kansas City, MO      64145-1116</option>'+
          '<option value="Annunciation Church      Lancaster, PA      17603-5498">Annunciation Church      Lancaster, PA      17603-5498</option>'+
          '<option value="Annunciation Church      Lincoln, NE      68505-2286">Annunciation Church      Lincoln, NE      68505-2286</option>'+
          '<option value="Annunciation Church      Little Rock, AR      72211-2312">Annunciation Church      Little Rock, AR      72211-2312</option>'+
          '<option value="Annunciation Church      Memphis, TN      38122-5107">Annunciation Church      Memphis, TN      38122-5107</option>'+
          '<option value="Annunciation Church      Milwaukee, WI      53225-4812">Annunciation Church      Milwaukee, WI      53225-4812</option>'+
          '<option value="Annunciation Church      Missoula, MT      59801-3936">Annunciation Church      Missoula, MT      59801-3936</option>'+
          '<option value="Annunciation Church      Mobile, AL      36604-2131">Annunciation Church      Mobile, AL      36604-2131</option>'+
          '<option value="Annunciation Church      Modesto, CA      95357-8128">Annunciation Church      Modesto, CA      95357-8128</option>'+
          '<option value="Annunciation Church      Montgomery, AL      36107-2207">Annunciation Church      Montgomery, AL      36107-2207</option>'+
          '<option value="Annunciation Church      Muskegon, MI      49444-9744">Annunciation Church      Muskegon, MI      49444-9744</option>'+
          '<option value="Annunciation Church      New York, NY      10024-1011">Annunciation Church      New York, NY      10024-1011</option>'+
          '<option value="Annunciation Church      Newburyport, MA      01950-0775">Annunciation Church      Newburyport, MA      01950-0775</option>'+
          '<option value="Annunciation Church      North Miami, FL      33168-4529">Annunciation Church      North Miami, FL      33168-4529</option>'+
          '<option value="Annunciation Church      Pensacola, FL      32501">Annunciation Church      Pensacola, FL      32501</option>'+
          '<option value="Annunciation Church      Sacramento, CA      95816-3810">Annunciation Church      Sacramento, CA      95816-3810</option>'+
          '<option value="Annunciation Church      Scranton, PA      18501-0021">Annunciation Church      Scranton, PA      18501-0021</option>'+
          '<option value="Annunciation Church      Stamford, CT      06905-1495">Annunciation Church      Stamford, CT      06905-1495</option>'+
          '<option value="Annunciation Church      Vestal, NY      13850-3543">Annunciation Church      Vestal, NY      13850-3543</option>'+
          '<option value="Annunciation Church      Wilkes Barre, PA      18701-2304">Annunciation Church      Wilkes Barre, PA      18701-2304</option>'+
          '<option value="Annunciation Church      Winston Salem, NC      27104-3907">Annunciation Church      Winston Salem, NC      27104-3907</option>'+
          '<option value="Annunciation Church      Woburn, MA      01801-4254">Annunciation Church      Woburn, MA      01801-4254</option>'+
          '<option value="Annunciation Church      York, PA      17403-5132">Annunciation Church      York, PA      17403-5132</option>'+
          '<option value="Annunciation Greek Orthodox Church      Ft Lauderdale, FL      33309">Annunciation Greek Orthodox Church      Ft Lauderdale, FL      33309</option>'+
          '<option value="Annunciation Greek Orthodox Church      Rochester, NY      14607">Annunciation Greek Orthodox Church      Rochester, NY      14607</option>'+
          '<option value="Annunciation of the Theotokos Church      McKeesport, PA      15131-1556">Annunciation of the Theotokos Church      McKeesport, PA      15131-1556</option>'+
          '<option value="Annunciation of the Virgin Mary Church      New Kensington, PA      15068-0526">Annunciation of the Virgin Mary Church      New Kensington, PA      15068-0526</option>'+
          '<option value="Archangel Gabriel Orthodox Church      Traverse City, MI      49696-6350">Archangel Gabriel Orthodox Church      Traverse City, MI      49696-6350</option>'+
          '<option value="Archangel Michael Chapel      Atlanta, GA      30329-3377">Archangel Michael Chapel      Atlanta, GA      30329-3377</option>'+
          '<option value="Archangel Michael Church      Campbell, OH      44405-1454">Archangel Michael Church      Campbell, OH      44405-1454</option>'+
          '<option value="Archangel Michael Church      Colorado Springs, CO      80907-7165">Archangel Michael Church      Colorado Springs, CO      80907-7165</option>'+
          '<option value="Archangel Michael Church      Iverness, FL      34451-0241">Archangel Michael Church      Iverness, FL      34451-0241</option>'+
          '<option value="Archangels Church      Stamford, CT      06905-4713">Archangels Church      Stamford, CT      06905-4713</option>'+
          '<option value="Ascension Cathedral      Oakland, CA      94602-2535">Ascension Cathedral      Oakland, CA      94602-2535</option>'+
          '<option value="Ascension Church      Fairview, NJ      07022-2003">Ascension Church      Fairview, NJ      07022-2003</option>'+
          '<option value="Ascension of Our Lord Church      Lincolnshire, IL      60069-2403">Ascension of Our Lord Church      Lincolnshire, IL      60069-2403</option>'+
          '<option value="Assumption Cathedral      Denver, CO      80246-1301">Assumption Cathedral      Denver, CO      80246-1301</option>'+
          '<option value="Assumption Church      Bayard, NE      69334-0550">Assumption Church      Bayard, NE      69334-0550</option>'+
          '<option value="Assumption Church      Chicago, IL      60644-5089">Assumption Church      Chicago, IL      60644-5089</option>'+
          '<option value="Assumption Church      Danbury, CT      06811-4542">Assumption Church      Danbury, CT      06811-4542</option>'+
          '<option value="Assumption Church      East Moline, IL      61244-4256">Assumption Church      East Moline, IL      61244-4256</option>'+
          '<option value="Assumption Church      Galveston, TX      77553-0655">Assumption Church      Galveston, TX      77553-0655</option>'+
          '<option value="Assumption Church      Grand Blanc, MI      48439-8311">Assumption Church      Grand Blanc, MI      48439-8311</option>'+
          '<option value="Assumption Church      Hegewisch, IL      60633-1847">Assumption Church      Hegewisch, IL      60633-1847</option>'+
          '<option value="Assumption Church      Homer Glen, IL      60491">Assumption Church      Homer Glen, IL      60491</option>'+
          '<option value="Assumption Church      Ipswich, MA      01938-0006">Assumption Church      Ipswich, MA      01938-0006</option>'+
          '<option value="Assumption Church      Louisville, KY      40242-4536">Assumption Church      Louisville, KY      40242-4536</option>'+
          '<option value="Assumption Church      Madison, WI      53704-4904">Assumption Church      Madison, WI      53704-4904</option>'+
          '<option value="Assumption Church      Manchester, NH      03109">Assumption Church      Manchester, NH      03109</option>'+
          '<option value="Assumption Church      Marquette, MI      49855-4339">Assumption Church      Marquette, MI      49855-4339</option>'+
          '<option value="Assumption Church      Morgantown, WV      26505-5525">Assumption Church      Morgantown, WV      26505-5525</option>'+
          '<option value="Assumption Church      Pawtucket, RI      02860-3205">Assumption Church      Pawtucket, RI      02860-3205</option>'+
          '<option value="Assumption Church      Pocatello, ID      83205-4567">Assumption Church      Pocatello, ID      83205-4567</option>'+
          '<option value="Assumption Church      Port Jefferson, NY      11777-2074">Assumption Church      Port Jefferson, NY      11777-2074</option>'+
          '<option value="Assumption Church      Price, UT      84501-0688">Assumption Church      Price, UT      84501-0688</option>'+
          '<option value="Assumption Church      San Angelo, TX      76903-7224">Assumption Church      San Angelo, TX      76903-7224</option>'+
          '<option value="Assumption Church      Scottsdale, AZ      85260-5211">Assumption Church      Scottsdale, AZ      85260-5211</option>'+
          '<option value="Assumption Church      Seattle, WA      98122-2515">Assumption Church      Seattle, WA      98122-2515</option>'+
          '<option value="Assumption Church      Somersworth, NH      03878-0110">Assumption Church      Somersworth, NH      03878-0110</option>'+
          '<option value="Assumption Church      St Clair Shores, MI      48080-2464">Assumption Church      St Clair Shores, MI      48080-2464</option>'+
          '<option value="Assumption Church      Town & Country, MO      63131-1405">Assumption Church      Town & Country, MO      63131-1405</option>'+
          '<option value="Assumption Church      Windham, NY      12496">Assumption Church      Windham, NY      12496</option>'+
          '<option value="Assumption Church of the Blessed Virgin      Springfield, OH      45505-1192">Assumption Church of the Blessed Virgin      Springfield, OH      45505-1192</option>'+
          '<option value="Assumption of the Blessed Virgin Mary Church      Long Beach, CA      90814-1900">Assumption of the Blessed Virgin Mary Church      Long Beach, CA      90814-1900</option>'+
          '<option value="Assumption of the Virgin Mary Church      Dracut, MA      01826-3147">Assumption of the Virgin Mary Church      Dracut, MA      01826-3147</option>'+
          '<option value="Christ the Savior Orthodox Mission      Spring Hill, FL      34604-0116">Christ the Savior Orthodox Mission      Spring Hill, FL      34604-0116</option>'+
          '<option value="Church of Our Saviour      Rye, NY      10580-1981">Church of Our Saviour      Rye, NY      10580-1981</option>'+
          '<option value="Church of the Holy Resurrection      Brookville, NY      11545-2124">Church of the Holy Resurrection      Brookville, NY      11545-2124</option>'+
          '<option value="Church of the Resurrection      Castro Valley, CA      94546-4712">Church of the Resurrection      Castro Valley, CA      94546-4712</option>'+
          '<option value="Dormition of The Mother Of God Church      Burlington, VT      05402-8122">Dormition of The Mother Of God Church      Burlington, VT      05402-8122</option>'+
          '<option value="Dormition of the Theotokos Church      Greensboro, NC      27410-4504">Dormition of the Theotokos Church      Greensboro, NC      27410-4504</option>'+
          '<option value="Dormition of the Theotokos Church      Oakmont, PA      15139-2114">Dormition of the Theotokos Church      Oakmont, PA      15139-2114</option>'+
          '<option value="Dormition of the Virgin Mary Church      Somerville, MA      02143-2841">Dormition of the Virgin Mary Church      Somerville, MA      02143-2841</option>'+
          '<option value="Dormition of the Virgin Mary Church      Winchester, VA      22601-2807">Dormition of the Virgin Mary Church      Winchester, VA      22601-2807</option>'+
          '<option value="Evangelismos Church      Easton, PA      18042">Evangelismos Church      Easton, PA      18042</option>'+
          '<option value="Evangelismos Church      Farrell, PA      16121-1871">Evangelismos Church      Farrell, PA      16121-1871</option>'+
          '<option value="Evangelismos Church      Philadelphia, PA      19149-2906">Evangelismos Church      Philadelphia, PA      19149-2906</option>'+
          '<option value="Evangelismos Tis Theotokou Church      Jersey City, NJ      07306-2411">Evangelismos Tis Theotokou Church      Jersey City, NJ      07306-2411</option>'+
          '<option value="Greek Orthodox Mission of South Orange County      San Juan Capistrano, CA      92675">Greek Orthodox Mission of South Orange County      San Juan Capistrano, CA      92675</option>'+
          '<option value="Greek Orthodox Mission Parish of Utah      Salt Lake City, UT      84110">Greek Orthodox Mission Parish of Utah      Salt Lake City, UT      84110</option>'+
          '<option value="Greek Orthodox Parish of Loudoun County      Dulles, VA      20166-6856">Greek Orthodox Parish of Loudoun County      Dulles, VA      20166-6856</option>'+
          '<option value="Holy Anargyroi/Sts. Cosmas &amp; Damianos Church      Rochester, MN      55902-6231">Holy Anargyroi/Sts. Cosmas &amp; Damianos Church      Rochester, MN      55902-6231</option>'+
          '<option value="Holy Apostles / Sts. Peter &amp; Paul Church      Haverhill, MA      01830-5690">Holy Apostles / Sts. Peter &amp; Paul Church      Haverhill, MA      01830-5690</option>'+
          '<option value="Holy Apostles Church      Cheyenne, WY      82009">Holy Apostles Church      Cheyenne, WY      82009</option>'+
          '<option value="Holy Apostles Church      Indianapolis, IN      46205-1825">Holy Apostles Church      Indianapolis, IN      46205-1825</option>'+
          '<option value="Holy Apostles Church      Westchester, IL      60154-4999">Holy Apostles Church      Westchester, IL      60154-4999</option>'+
          '<option value="Holy Apostles Greek Orthodox Church      Shoreline, WA      98133-3657">Holy Apostles Greek Orthodox Church      Shoreline, WA      98133-3657</option>'+
          '<option value="Holy Apostles Mission Church      Greenville, NC      27833-1055">Holy Apostles Mission Church      Greenville, NC      27833-1055</option>'+
          '<option value="Holy Cross Church      Belmont, CA      94002-1604">Holy Cross Church      Belmont, CA      94002-1604</option>'+
          '<option value="Holy Cross Church      Brooklyn, NY      11209-4327">Holy Cross Church      Brooklyn, NY      11209-4327</option>'+
          '<option value="Holy Cross Church      Farmington Hills, MI      48336-1381">Holy Cross Church      Farmington Hills, MI      48336-1381</option>'+
          '<option value="Holy Cross Church      Flagstaff, AZ      86003-2164">Holy Cross Church      Flagstaff, AZ      86003-2164</option>'+
          '<option value="Holy Cross Church      Justice, IL      60458">Holy Cross Church      Justice, IL      60458</option>'+
          '<option value="Holy Cross Church      Macon, GA      31201-6876">Holy Cross Church      Macon, GA      31201-6876</option>'+
          '<option value="Holy Cross Church      Middletown, NY      10941-4031">Holy Cross Church      Middletown, NY      10941-4031</option>'+
          '<option value="Holy Cross Church      Pittsburgh, PA      15228-1015">Holy Cross Church      Pittsburgh, PA      15228-1015</option>'+
          '<option value="Holy Cross Church      Stroudsburg, PA      18360-2337">Holy Cross Church      Stroudsburg, PA      18360-2337</option>'+
          '<option value="Holy Cross Church      Whitestone, NY      11357-1807">Holy Cross Church      Whitestone, NY      11357-1807</option>'+
          '<option value="Holy Cross Church      Wichita Falls, TX      76309-2902">Holy Cross Church      Wichita Falls, TX      76309-2902</option>'+
          '<option value="Holy Cross/Ss Constantine &amp; Helen Church      Huntsville, AL      35816-3133">Holy Cross/Ss Constantine &amp; Helen Church      Huntsville, AL      35816-3133</option>'+
          '<option value="Holy Mother of God Church      Tallahassee, FL      32308-5303">Holy Mother of God Church      Tallahassee, FL      32308-5303</option>'+
          '<option value="Holy Resurrection Church      Hilton Head, SC      29925-2888">Holy Resurrection Church      Hilton Head, SC      29925-2888</option>'+
          '<option value="Holy Spirit Church      Rochester, NY      14620-2315">Holy Spirit Church      Rochester, NY      14620-2315</option>'+
          '<option value="Holy Taxiarhai and St Haralambos Church      Niles, IL      60714-4503">Holy Taxiarhai and St Haralambos Church      Niles, IL      60714-4503</option>'+
          '<option value="Holy Transfiguration Church      Anchorage, AK      99507-4256">Holy Transfiguration Church      Anchorage, AK      99507-4256</option>'+
          '<option value="Holy Transfiguration Church      Marietta, GA      30066-4660">Holy Transfiguration Church      Marietta, GA      30066-4660</option>'+
          '<option value="Holy Transfiguration Church      Sioux Falls, SD      57105-2726">Holy Transfiguration Church      Sioux Falls, SD      57105-2726</option>'+
          '<option value="Holy Transfiguration Mission      Columbus, GA      31904">Holy Transfiguration Mission      Columbus, GA      31904</option>'+
          '<option value="Holy Trinity - St Nicholas Church      Cincinnati, OH      45224-1331">Holy Trinity - St Nicholas Church      Cincinnati, OH      45224-1331</option>'+
          '<option value="Holy Trinity - St Nicholas Church      Staten Island, NY      10314-1570">Holy Trinity - St Nicholas Church      Staten Island, NY      10314-1570</option>'+
          '<option value="Holy Trinity &amp; Holy Cross Cathedral      Birmingham, AL      35233-1919">Holy Trinity &amp; Holy Cross Cathedral      Birmingham, AL      35233-1919</option>'+
          '<option value="Holy Trinity &amp; St John the Theologian Church      Jackson, MS      39211">Holy Trinity &amp; St John the Theologian Church      Jackson, MS      39211</option>'+
          '<option value="Holy Trinity Cathedral      Camp Hill, PA      17011-1239">Holy Trinity Cathedral      Camp Hill, PA      17011-1239</option>'+
          '<option value="Holy Trinity Cathedral      New Orleans, LA      70122-1337">Holy Trinity Cathedral      New Orleans, LA      70122-1337</option>'+
          '<option value="Holy Trinity Cathedral      New York, NY      10021-3797">Holy Trinity Cathedral      New York, NY      10021-3797</option>'+
          '<option value="Holy Trinity Cathedral      Phoenix, AZ      85016-1415">Holy Trinity Cathedral      Phoenix, AZ      85016-1415</option>'+
          '<option value="Holy Trinity Cathedral      Portland, OR      97232-2501">Holy Trinity Cathedral      Portland, OR      97232-2501</option>'+
          '<option value="Holy Trinity Cathedral      Salt Lake City, UT      84101-1703">Holy Trinity Cathedral      Salt Lake City, UT      84101-1703</option>'+
          '<option value="Holy Trinity Cathedral      Toledo, OH      43604-1737">Holy Trinity Cathedral      Toledo, OH      43604-1737</option>'+
          '<option value="Holy Trinity Church      Altoona, PA      16601-3339">Holy Trinity Church      Altoona, PA      16601-3339</option>'+
          '<option value="Holy Trinity Church      Ambridge, PA      15003-1418">Holy Trinity Church      Ambridge, PA      15003-1418</option>'+
          '<option value="Holy Trinity Church      Asheville, NC      28814-8369">Holy Trinity Church      Asheville, NC      28814-8369</option>'+
          '<option value="Holy Trinity Church      Augusta, GA      30901-2205">Holy Trinity Church      Augusta, GA      30901-2205</option>'+
          '<option value="Holy Trinity Church      Baton Rouge, LA      70884">Holy Trinity Church      Baton Rouge, LA      70884</option>'+
          '<option value="Holy Trinity Church      Biloxi, MS      39535">Holy Trinity Church      Biloxi, MS      39535</option>'+
          '<option value="Holy Trinity Church      Binghamton, NY      13901-3605">Holy Trinity Church      Binghamton, NY      13901-3605</option>'+
          '<option value="Holy Trinity Church      Bluff City, TN      37618-1868">Holy Trinity Church      Bluff City, TN      37618-1868</option>'+
          '<option value="Holy Trinity Church      Bridgeport, CT      06604-1047">Holy Trinity Church      Bridgeport, CT      06604-1047</option>'+
          '<option value="Holy Trinity Church      Canton, OH      44709-1348">Holy Trinity Church      Canton, OH      44709-1348</option>'+
          '<option value="Holy Trinity Church      Carmel, IN      46032-5513">Holy Trinity Church      Carmel, IN      46032-5513</option>'+
          '<option value="Holy Trinity Church      Casper, WY      82602-1465">Holy Trinity Church      Casper, WY      82602-1465</option>'+
          '<option value="Holy Trinity Church      Charleston, SC      29403-4606">Holy Trinity Church      Charleston, SC      29403-4606</option>'+
          '<option value="Holy Trinity Church      Chicago, IL      60639-1139">Holy Trinity Church      Chicago, IL      60639-1139</option>'+
          '<option value="Holy Trinity Church      Clearwater, FL      33765-4410">Holy Trinity Church      Clearwater, FL      33765-4410</option>'+
          '<option value="Holy Trinity Church      Columbia, SC      29201-2503">Holy Trinity Church      Columbia, SC      29201-2503</option>'+
          '<option value="Holy Trinity Church      Concor, NH      03301-4330">Holy Trinity Church      Concor, NH      03301-4330</option>'+
          '<option value="Holy Trinity Church      Dallas, TX      75240-5412">Holy Trinity Church      Dallas, TX      75240-5412</option>'+
          '<option value="Holy Trinity Church      Danielson, CT      06239-0236">Holy Trinity Church      Danielson, CT      06239-0236</option>'+
          '<option value="Holy Trinity Church      Egg Harbor Township, NJ      08234-9651">Holy Trinity Church      Egg Harbor Township, NJ      08234-9651</option>'+
          '<option value="Holy Trinity Church      Fitchburg, MA      01420-3033">Holy Trinity Church      Fitchburg, MA      01420-3033</option>'+
          '<option value="Holy Trinity Church      Fond Du Lac, WI      54936-0011">Holy Trinity Church      Fond Du Lac, WI      54936-0011</option>'+
          '<option value="Holy Trinity Church      Fort Wayne, IN      46825-2729">Holy Trinity Church      Fort Wayne, IN      46825-2729</option>'+
          '<option value="Holy Trinity Church      Grand Rapids, MI      49503-3815">Holy Trinity Church      Grand Rapids, MI      49503-3815</option>'+
          '<option value="Holy Trinity Church      Hicksville, NY      11801-5321">Holy Trinity Church      Hicksville, NY      11801-5321</option>'+
          '<option value="Holy Trinity Church      Holyoke, MA      01040-5610">Holy Trinity Church      Holyoke, MA      01040-5610</option>'+
          '<option value="Holy Trinity Church      Lansing, MI      48912-2316">Holy Trinity Church      Lansing, MI      48912-2316</option>'+
          '<option value="Holy Trinity Church      Lewiston, ME      04243-1344">Holy Trinity Church      Lewiston, ME      04243-1344</option>'+
          '<option value="Holy Trinity Church      Lowell, MA      01854-4213">Holy Trinity Church      Lowell, MA      01854-4213</option>'+
          '<option value="Holy Trinity Church      Maitland, FL      32751-3159">Holy Trinity Church      Maitland, FL      32751-3159</option>'+
          '<option value="Holy Trinity Church      Nashvill, TN      37220-1517">Holy Trinity Church      Nashvill, TN      37220-1517</option>'+
          '<option value="Holy Trinity Church      New Rochelle, NY      10804-2119">Holy Trinity Church      New Rochelle, NY      10804-2119</option>'+
          '<option value="Holy Trinity Church      Norwich, CT      06360-3517">Holy Trinity Church      Norwich, CT      06360-3517</option>'+
          '<option value="Holy Trinity Church      Pittsburgh, PA      15237">Holy Trinity Church      Pittsburgh, PA      15237</option>'+
          '<option value="Holy Trinity Church      Portland, ME      04101-3808">Holy Trinity Church      Portland, ME      04101-3808</option>'+
          '<option value="Holy Trinity Church      Pt Charlotte, FL      33980-2702">Holy Trinity Church      Pt Charlotte, FL      33980-2702</option>'+
          '<option value="Holy Trinity Church      Raleigh, NC      27612">Holy Trinity Church      Raleigh, NC      27612</option>'+
          '<option value="Holy Trinity Church      Roanoke, VA      24012-3605">Holy Trinity Church      Roanoke, VA      24012-3605</option>'+
          '<option value="Holy Trinity Church      Rock Springs, WY      82901">Holy Trinity Church      Rock Springs, WY      82901</option>'+
          '<option value="Holy Trinity Church      San Francisco, CA      94132-2904">Holy Trinity Church      San Francisco, CA      94132-2904</option>'+
          '<option value="Holy Trinity Church      Sioux City, IA      51101-1818">Holy Trinity Church      Sioux City, IA      51101-1818</option>'+
          '<option value="Holy Trinity Church      Spokane, WA      99205-4769">Holy Trinity Church      Spokane, WA      99205-4769</option>'+
          '<option value="Holy Trinity Church      St Augustine, FL      32084-2718">Holy Trinity Church      St Augustine, FL      32084-2718</option>'+
          '<option value="Holy Trinity Church      Steubenville, OH      43952-5788">Holy Trinity Church      Steubenville, OH      43952-5788</option>'+
          '<option value="Holy Trinity Church      Tulsa, OK      74119-2612">Holy Trinity Church      Tulsa, OK      74119-2612</option>'+
          '<option value="Holy Trinity Church      Waterbury, CT      06708-2903">Holy Trinity Church      Waterbury, CT      06708-2903</option>'+
          '<option value="Holy Trinity Church      Westfield, NJ      07090-1109">Holy Trinity Church      Westfield, NJ      07090-1109</option>'+
          '<option value="Holy Trinity Church      Wichita, KS      67208-3439">Holy Trinity Church      Wichita, KS      67208-3439</option>'+
          '<option value="Holy Trinity Church      Wilmington, DE      19806-4625">Holy Trinity Church      Wilmington, DE      19806-4625</option>'+
          '<option value="Holy Trinity Greek Orthodox Cathedral      Charlotte, NC      28203-5112">Holy Trinity Greek Orthodox Cathedral      Charlotte, NC      28203-5112</option>'+
          '<option value="Kimisis Tis Theotokou Church      Aliquippa, PA      15001-2706">Kimisis Tis Theotokou Church      Aliquippa, PA      15001-2706</option>'+
          '<option value="Kimisis Tis Theotokou Church      Brooklyn, NY      11215-5303">Kimisis Tis Theotokou Church      Brooklyn, NY      11215-5303</option>'+
          '<option value="Kimisis Tis Theotokou Church      Holmdel, NJ      07733-1614">Kimisis Tis Theotokou Church      Holmdel, NJ      07733-1614</option>'+
          '<option value="Kimisis Tis Theotokou Church      island Park, NY      11558">Kimisis Tis Theotokou Church      island Park, NY      11558</option>'+
          '<option value="Kimisis Tis Theotokou Church      Poughkeepsie, NY      12603-3010">Kimisis Tis Theotokou Church      Poughkeepsie, NY      12603-3010</option>'+
          '<option value="Kimisis Tis Theotokou Church      Southampton, NY      11968-3807">Kimisis Tis Theotokou Church      Southampton, NY      11968-3807</option>'+
          '<option value="Kimissis Tis Theotokou Church      Racine, WI      53406-4405">Kimissis Tis Theotokou Church      Racine, WI      53406-4405</option>'+
          '<option value="Koimisis Tis Theotokou Church      Erie, PA      16505-1416">Koimisis Tis Theotokou Church      Erie, PA      16505-1416</option>'+
          '<option value="Maui Orthodox Christian Mission      Kihei, MA      96753">Maui Orthodox Christian Mission      Kihei, MA      96753</option>'+
          '<option value="Nativity of Christ Church      Novato, CA      94949-5481">Nativity of Christ Church      Novato, CA      94949-5481</option>'+
          '<option value="Nativity of the Theotokos Church      Fredericksburg, VA      22407">Nativity of the Theotokos Church      Fredericksburg, VA      22407</option>'+
          '<option value="Nativity of the Virgin Mary Church      Plymouth, MI      48170-2708">Nativity of the Virgin Mary Church      Plymouth, MI      48170-2708</option>'+
          '<option value="Nativity-Assumption of the Virgin Mary Church      Cohasset, MA      02025-1046">Nativity-Assumption of the Virgin Mary Church      Cohasset, MA      02025-1046</option>'+
          '<option value="Panagia Pantovasilissa Church      Lexington, KY      40502-2203">Panagia Pantovasilissa Church      Lexington, KY      40502-2203</option>'+
          '<option value="Presentation of Christ Church      East Pittsburgh, PA      15112-0310">Presentation of Christ Church      East Pittsburgh, PA      15112-0310</option>'+
          '<option value="Prophet Elias Church      Holladay, UT      84117-7633">Prophet Elias Church      Holladay, UT      84117-7633</option>'+
          '<option value="Prophet Elias Church      San Bernardino, CA      92402-0311">Prophet Elias Church      San Bernardino, CA      92402-0311</option>'+
          '<option value="Prophet Elias Church      Santa Cruz, CA      95060-3809">Prophet Elias Church      Santa Cruz, CA      95060-3809</option>'+
          '<option value="Prophet Elias Church      Yonkers, NY      10705-4519">Prophet Elias Church      Yonkers, NY      10705-4519</option>'+
          '<option value="St Andrew Church      Chicago, IL      60660-4899">St Andrew Church      Chicago, IL      60660-4899</option>'+
          '<option value="St Andrew Church      Lubbock, TX      79493-3705">St Andrew Church      Lubbock, TX      79493-3705</option>'+
          '<option value="St Andrew Church      Miami, FL      33156-7456">St Andrew Church      Miami, FL      33156-7456</option>'+
          '<option value="St Andrew Church      Randolph, NJ      07869-1830">St Andrew Church      Randolph, NJ      07869-1830</option>'+
          '<option value="St Andrew Church      South Bend, IN      46635-1124">St Andrew Church      South Bend, IN      46635-1124</option>'+
          '<option value="St Andrew the Apostle Greek Orthodox Church      San Luis Obispo, CA      93405-1540">St Andrew the Apostle Greek Orthodox Church      San Luis Obispo, CA      93405-1540</option>'+
          '<option value="St Anna Church      Flemington, NJ      08822">St Anna Church      Flemington, NJ      08822</option>'+
          '<option value="St Anna Greek Orthodox Church      Roseville, CA      95661-4093">St Anna Greek Orthodox Church      Roseville, CA      95661-4093</option>'+
          '<option value="St Anthony Church      Clairton, PA      15025-0031">St Anthony Church      Clairton, PA      15025-0031</option>'+
          '<option value="St Anthony Church      Pasadena, CA      91107-5613">St Anthony Church      Pasadena, CA      91107-5613</option>'+
          '<option value="St Anthony Church      Reno, NV      89509-5814">St Anthony Church      Reno, NV      89509-5814</option>'+
          '<option value="St Anthony Church      Springfield, IL      62704-3611">St Anthony Church      Springfield, IL      62704-3611</option>'+
          '<option value="St Anthony Church      Vineland, NJ      08360-1911">St Anthony Church      Vineland, NJ      08360-1911</option>'+
          '<option value="St Athanasios Church      Aurora, IL      60504-8776">St Athanasios Church      Aurora, IL      60504-8776</option>'+
          '<option value="St Athanasios Church      Elmira, NY      14904-1706">St Athanasios Church      Elmira, NY      14904-1706</option>'+
          '<option value="St Athanasios Church      Paramus, NJ      07652-1320">St Athanasios Church      Paramus, NJ      07652-1320</option>'+
          '<option value="St Athanasios Hellenic Orthodox Mission      Gulf Shores, AL      36547-3668">St Athanasios Hellenic Orthodox Mission      Gulf Shores, AL      36547-3668</option>'+
          '<option value="St Athanasius the Great Church      Arlington, MA      02476-5966">St Athanasius the Great Church      Arlington, MA      02476-5966</option>'+
          '<option value="St Barbara Church      Durham, NC      27713-6860">St Barbara Church      Durham, NC      27713-6860</option>'+
          '<option value="St Barbara Church      New York, NY      10002-6001">St Barbara Church      New York, NY      10002-6001</option>'+
          '<option value="St Barbara Church      Orange, CT      06477-2514">St Barbara Church      Orange, CT      06477-2514</option>'+
          '<option value="St Barbara Church      Santa Barbara, CA      93111-1313">St Barbara Church      Santa Barbara, CA      93111-1313</option>'+
          '<option value="St Barbara Church      Toms River, NJ      08753-8106">St Barbara Church      Toms River, NJ      08753-8106</option>'+
          '<option value="St Barbara Greek Orthodox Church      Sarasota, FL      34243-4931">St Barbara Greek Orthodox Church      Sarasota, FL      34243-4931</option>'+
          '<option value="St Basil Church      Chicago, IL      60607-3103">St Basil Church      Chicago, IL      60607-3103</option>'+
          '<option value="St Basil Church      San Jose, CA      95120-3413">St Basil Church      San Jose, CA      95120-3413</option>'+
          '<option value="St Basil Church      Stockton, CA      95207-6209">St Basil Church      Stockton, CA      95207-6209</option>'+
          '<option value="St Basil Church      Troy, NY      12180-1243">St Basil Church      Troy, NY      12180-1243</option>'+
          '<option value="St Basil the Great Church      Houston, TX      77077-1647">St Basil the Great Church      Houston, TX      77077-1647</option>'+
          '<option value="St Basil the Great Church      New Haven, CT      06533-0356">St Basil the Great Church      New Haven, CT      06533-0356</option>'+
          '<option value="St Catherine Church      Braintree, MA      02184-1767">St Catherine Church      Braintree, MA      02184-1767</option>'+
          '<option value="St Catherine Church      Greenwood Village, CO      80111-3319">St Catherine Church      Greenwood Village, CO      80111-3319</option>'+
          '<option value="St Catherine Church      Ithaca, NY      14850-4138">St Catherine Church      Ithaca, NY      14850-4138</option>'+
          '<option value="St Catherine Church      West Palm Beach, FL      33405-2736">St Catherine Church      West Palm Beach, FL      33405-2736</option>'+
          '<option value="St Christopher Hellenic Orthodox Church      Peachtree Cty, GA      30269-1933">St Christopher Hellenic Orthodox Church      Peachtree Cty, GA      30269-1933</option>'+
          '<option value="St Demetrios Cathedral      Astoria, NY      11102-1854">St Demetrios Cathedral      Astoria, NY      11102-1854</option>'+
          '<option value="St Demetrios Church      Baltimore, MD      21234-8218">St Demetrios Church      Baltimore, MD      21234-8218</option>'+
          '<option value="St Demetrios Church      Bristol, CT      06010-4936">St Demetrios Church      Bristol, CT      06010-4936</option>'+
          '<option value="St Demetrios Church      Camarillo, CA      93011-1970">St Demetrios Church      Camarillo, CA      93011-1970</option>'+
          '<option value="St Demetrios Church      Chicago, IL      60625-2508">St Demetrios Church      Chicago, IL      60625-2508</option>'+
          '<option value="St Demetrios Church      Concord, CA      94521-1627">St Demetrios Church      Concord, CA      94521-1627</option>'+
          '<option value="St Demetrios Church      Daytona Beach, FL      32118-4250">St Demetrios Church      Daytona Beach, FL      32118-4250</option>'+
          '<option value="St Demetrios Church      Elmhurst, IL      60126-1005">St Demetrios Church      Elmhurst, IL      60126-1005</option>'+
          '<option value="St Demetrios Church      Fall River, MA      02720-2320">St Demetrios Church      Fall River, MA      02720-2320</option>'+
          '<option value="St Demetrios Church      Fort Worth, TX      76164">St Demetrios Church      Fort Worth, TX      76164</option>'+
          '<option value="St Demetrios Church      Ft Lauderdale, FL      33304-4402">St Demetrios Church      Ft Lauderdale, FL      33304-4402</option>'+
          '<option value="St Demetrios Church      Hammond, IN      46324-1813">St Demetrios Church      Hammond, IN      46324-1813</option>'+
          '<option value="St Demetrios Church      Jamaica, NY      11432-1641">St Demetrios Church      Jamaica, NY      11432-1641</option>'+
          '<option value="St Demetrios Church      Jersey City, NJ      07306-2913">St Demetrios Church      Jersey City, NJ      07306-2913</option>'+
          '<option value="St Demetrios Church      Libertyville, IL      60048-4229">St Demetrios Church      Libertyville, IL      60048-4229</option>'+
          '<option value="St Demetrios Church      Merrick, NY      11566-3918">St Demetrios Church      Merrick, NY      11566-3918</option>'+
          '<option value="St Demetrios Church      North Wildwood, NJ      08260-3107">St Demetrios Church      North Wildwood, NJ      08260-3107</option>'+
          '<option value="St Demetrios Church      Parkville, MD      21234-1097">St Demetrios Church      Parkville, MD      21234-1097</option>'+
          '<option value="St Demetrios Church      Perth Amboy, NJ      08861-4723">St Demetrios Church      Perth Amboy, NJ      08861-4723</option>'+
          '<option value="St Demetrios Church      Rocky River, OH      44116-3047">St Demetrios Church      Rocky River, OH      44116-3047</option>'+
          '<option value="St Demetrios Church      Saco, ME      04072-3103">St Demetrios Church      Saco, ME      04072-3103</option>'+
          '<option value="St Demetrios Church      Saginaw, MI      48603-7249">St Demetrios Church      Saginaw, MI      48603-7249</option>'+
          '<option value="St Demetrios Church      Seattle, WA      98112-2115">St Demetrios Church      Seattle, WA      98112-2115</option>'+
          '<option value="St Demetrios Church      Tucson, AZ      85719-2116">St Demetrios Church      Tucson, AZ      85719-2116</option>'+
          '<option value="St Demetrios Church      Union, NJ      07083">St Demetrios Church      Union, NJ      07083</option>'+
          '<option value="St Demetrios Church      Upper Darby, PA      19082-3328">St Demetrios Church      Upper Darby, PA      19082-3328</option>'+
          '<option value="St Demetrios Church      Warren, OH      44482-4214">St Demetrios Church      Warren, OH      44482-4214</option>'+
          '<option value="St Demetrios Church      Waterloo, IA      50702-1501">St Demetrios Church      Waterloo, IA      50702-1501</option>'+
          '<option value="St Demetrios Church      Weston, MA      02493">St Demetrios Church      Weston, MA      02493</option>'+
          '<option value="St Demetrios Church      Willamsburg, VA      23187">St Demetrios Church      Willamsburg, VA      23187</option>'+
          '<option value="St Dionysios Church      Overland Park, KS      66212-3214">St Dionysios Church      Overland Park, KS      66212-3214</option>'+
          '<option value="St Eleftherios Church      New York, NY      10011-1501">St Eleftherios Church      New York, NY      10011-1501</option>'+
          '<option value="St Elias The Prophet Church      Dubuque, IA      52003-8739">St Elias The Prophet Church      Dubuque, IA      52003-8739</option>'+
          '<option value="St Elias The Prophet Church      Santa Fe, NM      87508-9143">St Elias The Prophet Church      Santa Fe, NM      87508-9143</option>'+
          '<option value="St Elizabeth the Wonderworker Church      Gainesville, FL      32653-4318">St Elizabeth the Wonderworker Church      Gainesville, FL      32653-4318</option>'+
          '<option value="St Elpis Church      Hopewell, VA      23860-1204">St Elpis Church      Hopewell, VA      23860-1204</option>'+
          '<option value="St Fanourios Church      Elizabeth, NJ      07201-2544">St Fanourios Church      Elizabeth, NJ      07201-2544</option>'+
          '<option value="St George - St Demetrios Church      New York, NY      10029-0293">St George - St Demetrios Church      New York, NY      10029-0293</option>'+
          '<option value="St George Cathedral      Greenville, SC      29601-2046">St George Cathedral      Greenville, SC      29601-2046</option>'+
          '<option value="St George Cathedral      Hartford, CT      06114-2718">St George Cathedral      Hartford, CT      06114-2718</option>'+
          '<option value="St George Cathedral      Manchester, NH      03104-5306">St George Cathedral      Manchester, NH      03104-5306</option>'+
          '<option value="St George Cathedral      Philadelphia, PA      19107-5731">St George Cathedral      Philadelphia, PA      19107-5731</option>'+
          '<option value="St George Cathedral      Springfield, MA      01104-3332">St George Cathedral      Springfield, MA      01104-3332</option>'+
          '<option value="St George Chapel      Brunswich, GA      31520-8241">St George Chapel      Brunswich, GA      31520-8241</option>'+
          '<option value="St George Church      Albuquerque, NM      87102-3631">St George Church      Albuquerque, NM      87102-3631</option>'+
          '<option value="St George Church      Bakersfield, CA      93301-5315">St George Church      Bakersfield, CA      93301-5315</option>'+
          '<option value="St George Church      Bangor, ME      04401-6132">St George Church      Bangor, ME      04401-6132</option>'+
          '<option value="St George Church      Bloomfield, MI      48302-5019">St George Church      Bloomfield, MI      48302-5019</option>'+
          '<option value="St George Church      Centerville/Hyannis, MA      02632-3022">St George Church      Centerville/Hyannis, MA      02632-3022</option>'+
          '<option value="St George Church      Chicago, IL      60614-1326">St George Church      Chicago, IL      60614-1326</option>'+
          '<option value="St George Church      Clifton, NJ      07013-2206">St George Church      Clifton, NJ      07013-2206</option>'+
          '<option value="St George Church      Dartmouth, MA      02747-0985">St George Church      Dartmouth, MA      02747-0985</option>'+
          '<option value="St George Church      Dekalb, IL      60115-3718">St George Church      Dekalb, IL      60115-3718</option>'+
          '<option value="St George Church      Des Moines, IA      50311-3704">St George Church      Des Moines, IA      50311-3704</option>'+
          '<option value="St George Church      Downey, CA      90241-3720">St George Church      Downey, CA      90241-3720</option>'+
          '<option value="St George Church      Eugene, OR      97408-5018">St George Church      Eugene, OR      97408-5018</option>'+
          '<option value="St George Church      Fresno, CA      93703-2323">St George Church      Fresno, CA      93703-2323</option>'+
          '<option value="St George Church      High Point, NC      27262-4027">St George Church      High Point, NC      27262-4027</option>'+
          '<option value="St George Church      Hollywood, FL      33021-6213">St George Church      Hollywood, FL      33021-6213</option>'+
          '<option value="St George Church      Huntington, WV      25727-2822">St George Church      Huntington, WV      25727-2822</option>'+
          '<option value="St George Church      Keene, NH      03431-0392">St George Church      Keene, NH      03431-0392</option>'+
          '<option value="St George Church      Kingston, NY      12401-5342">St George Church      Kingston, NY      12401-5342</option>'+
          '<option value="St George Church      Knoxville, TN      37919-5245">St George Church      Knoxville, TN      37919-5245</option>'+
          '<option value="St George Church      Lowell, MA      01851-2405">St George Church      Lowell, MA      01851-2405</option>'+
          '<option value="St George Church      Lynchburg, VA      24503-3120">St George Church      Lynchburg, VA      24503-3120</option>'+
          '<option value="St George Church      Lynn, MA      01902-4495">St George Church      Lynn, MA      01902-4495</option>'+
          '<option value="St George Church      Massillon, OH      44646-6718">St George Church      Massillon, OH      44646-6718</option>'+
          '<option value="St George Church      Media, PA      19063-4345">St George Church      Media, PA      19063-4345</option>'+
          '<option value="St George Church      New Britain, CT      06050-1753">St George Church      New Britain, CT      06050-1753</option>'+
          '<option value="St George Church      New Castle, PA      16105-1805">St George Church      New Castle, PA      16105-1805</option>'+
          '<option value="St George Church      New Port Richey, FL      34654-3417">St George Church      New Port Richey, FL      34654-3417</option>'+
          '<option value="St George Church      New York, NY      10019-5101">St George Church      New York, NY      10019-5101</option>'+
          '<option value="St George Church      Norwalk, CT      06851-1133">St George Church      Norwalk, CT      06851-1133</option>'+
          '<option value="St George Church      Ocean City, MD      21842-2739">St George Church      Ocean City, MD      21842-2739</option>'+
          '<option value="St George Church      Ocean, NJ      0+F2987712">St George Church      Ocean, NJ      0+F2987712</option>'+
          '<option value="St George Church      Oklahoma City, OK      73134-6112">St George Church      Oklahoma City, OK      73134-6112</option>'+
          '<option value="St George Church      Palm Desert, CA      92261-4755">St George Church      Palm Desert, CA      92261-4755</option>'+
          '<option value="St George Church      Piscataway, NJ      08854-5620">St George Church      Piscataway, NJ      08854-5620</option>'+
          '<option value="St George Church      Pittsfield, MA      01201-4523">St George Church      Pittsfield, MA      01201-4523</option>'+
          '<option value="St George Church      Port Arthur, TX      77643-3035">St George Church      Port Arthur, TX      77643-3035</option>'+
          '<option value="St George Church      Prescott, AZ      86305-3619">St George Church      Prescott, AZ      86305-3619</option>'+
          '<option value="St George Church      Redding, CA      96001-1090">St George Church      Redding, CA      96001-1090</option>'+
          '<option value="St George Church      Rock Island, IL      61201-6323">St George Church      Rock Island, IL      61201-6323</option>'+
          '<option value="St George Church      Saint Paul, MN      55105-2648">St George Church      Saint Paul, MN      55105-2648</option>'+
          '<option value="St George Church      Sault Sainte Marie, MI      49783-0842">St George Church      Sault Sainte Marie, MI      49783-0842</option>'+
          '<option value="St George Church      Schenectady, NY      12305">St George Church      Schenectady, NY      12305</option>'+
          '<option value="St George Church      Schererville, IN      46375-2352">St George Church      Schererville, IN      46375-2352</option>'+
          '<option value="St George Church      Shreveport, LA      71101-4725">St George Church      Shreveport, LA      71101-4725</option>'+
          '<option value="St George Church      Southbridge, MA      01550-0025">St George Church      Southbridge, MA      01550-0025</option>'+
          '<option value="St George Church      Southgate, MI      48195-2970">St George Church      Southgate, MI      48195-2970</option>'+
          '<option value="St George Church      Trenton, NJ      08619-3614">St George Church      Trenton, NJ      08619-3614</option>'+
          '<option value="St George Greek Orthodox Church      Bethesda, MD      20817">St George Greek Orthodox Church      Bethesda, MD      20817</option>'+
          '<option value="St Gerasimos Church      New York, NY      10025-4024">St Gerasimos Church      New York, NY      10025-4024</option>'+
          '<option value="St Gregory of Nyssa Church      El Cajon, CA      92019-3752">St Gregory of Nyssa Church      El Cajon, CA      92019-3752</option>'+
          '<option value="St Gregory The Theologian Church      Mansfield, MA      02048-0293">St Gregory The Theologian Church      Mansfield, MA      02048-0293</option>'+
          '<option value="St Haralambos Church      Canton, OH      44709-3923">St Haralambos Church      Canton, OH      44709-3923</option>'+
          '<option value="St Haralambos Church      Peoria, AZ      85383-1674">St Haralambos Church      Peoria, AZ      85383-1674</option>'+
          '<option value="St Iakovos Church      Valparaiso, IN      46385">St Iakovos Church      Valparaiso, IN      46385</option>'+
          '<option value="St John Chrysostom Greek Orthodox Church      Hobe Sound, FL      33475">St John Chrysostom Greek Orthodox Church      Hobe Sound, FL      33475</option>'+
          '<option value="St John Chrysostom Greek Orthodox Mission      Nashville, TN      37209">St John Chrysostom Greek Orthodox Mission      Nashville, TN      37209</option>'+
          '<option value="St John Church      Blue Point, NY      11715-0066">St John Church      Blue Point, NY      11715-0066</option>'+
          '<option value="St John Church      Charleston, WV      25304-1420">St John Church      Charleston, WV      25304-1420</option>'+
          '<option value="St John Church      Sterling Hts, MI      48312-2937">St John Church      Sterling Hts, MI      48312-2937</option>'+
          '<option value="St John Church      Youngstown, OH      44512-1460">St John Church      Youngstown, OH      44512-1460</option>'+
          '<option value="St John of Kronstandt Church      Cleveland, OH      44144-1432">St John of Kronstandt Church      Cleveland, OH      44144-1432</option>'+
          '<option value="St John the Baptist Church      Anaheim, CA      92801-4818">St John the Baptist Church      Anaheim, CA      92801-4818</option>'+
          '<option value="St John The Baptist Church      Boston, MA      02118-2129">St John The Baptist Church      Boston, MA      02118-2129</option>'+
          '<option value="St John the Baptist Church      Cedar Rapids, IA      52401-1015">St John the Baptist Church      Cedar Rapids, IA      52401-1015</option>'+
          '<option value="St John the Baptist Church      Craig, CO      81626-0848">St John the Baptist Church      Craig, CO      81626-0848</option>'+
          '<option value="St John the Baptist Church      Des Plaines, IL      60016-4839">St John the Baptist Church      Des Plaines, IL      60016-4839</option>'+
          '<option value="St John the Baptist Church      Euless, TX      76040-4625">St John the Baptist Church      Euless, TX      76040-4625</option>'+
          '<option value="St John the Baptist Church      Las Vegas, NV      89118-1922">St John the Baptist Church      Las Vegas, NV      89118-1922</option>'+
          '<option value="St John The Baptist Church      Myrtle Beach, SC      29577-5883">St John The Baptist Church      Myrtle Beach, SC      29577-5883</option>'+
          '<option value="St John The Baptist Church      New York, NY      10003-3402">St John The Baptist Church      New York, NY      10003-3402</option>'+
          '<option value="St John the Baptist Church      Omaha, NE      68105-2712">St John the Baptist Church      Omaha, NE      68105-2712</option>'+
          '<option value="St John The Baptist Church      Pueblo, CO      81005-0011">St John The Baptist Church      Pueblo, CO      81005-0011</option>'+
          '<option value="St John the Baptist Church      Salinas, CA      93901-2033">St John the Baptist Church      Salinas, CA      93901-2033</option>'+
          '<option value="St John the Baptist Church      Tampa, FL      33609-4712">St John the Baptist Church      Tampa, FL      33609-4712</option>'+
          '<option value="St John the Baptist Greek Orthodox Church      Beaverton, OR      97006-6041">St John the Baptist Greek Orthodox Church      Beaverton, OR      97006-6041</option>'+
          '<option value="St John the Divine Church      Jacksonville, FL      32207-2033">St John the Divine Church      Jacksonville, FL      32207-2033</option>'+
          '<option value="St John the Divine Church      Wheeling, WV      26003-3842">St John the Divine Church      Wheeling, WV      26003-3842</option>'+
          '<option value="St John the Prodromos Church      Amarillo, TX      79106-4215">St John the Prodromos Church      Amarillo, TX      79106-4215</option>'+
          '<option value="St John the Theologian Cathedral      Tenafly, NJ      07670-2319">St John the Theologian Cathedral      Tenafly, NJ      07670-2319</option>'+
          '<option value="St John The Theologian Church      Panama City, FL      32405-4211">St John The Theologian Church      Panama City, FL      32405-4211</option>'+
          '<option value="St John the Theologian Church      Webster, TX      77598-5125">St John the Theologian Church      Webster, TX      77598-5125</option>'+
          '<option value="St Johns Chapel (Closed)      Destin, FL      32541-7337">St Johns Chapel (Closed)      Destin, FL      32541-7337</option>'+
          '<option value="St Katherine Church      Burlington, NC      27216-1004">St Katherine Church      Burlington, NC      27216-1004</option>'+
          '<option value="St Katherine Church      Chandler, AZ      85224-1806">St Katherine Church      Chandler, AZ      85224-1806</option>'+
          '<option value="St Katherine Church      Falls Church, VA      22041-2430">St Katherine Church      Falls Church, VA      22041-2430</option>'+
          '<option value="St Katherine Church      Naples, FL      34109">St Katherine Church      Naples, FL      34109</option>'+
          '<option value="St Katherine Church      Redondo Beach, CA      90277-4345">St Katherine Church      Redondo Beach, CA      90277-4345</option>'+
          '<option value="St Katherine Greek Orthodox Church      Elk Grove, CA      95758-7420">St Katherine Greek Orthodox Church      Elk Grove, CA      95758-7420</option>'+
          '<option value="St Katherine Greek Orthodox Church      Melbourne, FL      32940-2003">St Katherine Greek Orthodox Church      Melbourne, FL      32940-2003</option>'+
          '<option value="St Katherine-St George Church      Astoria, NY      11105">St Katherine-St George Church      Astoria, NY      11105</option>'+
          '<option value="St Luke Church      Broomall, PA      19008-1932">St Luke Church      Broomall, PA      19008-1932</option>'+
          '<option value="St Luke Church      East Longmeadow, MA      01028-0381">St Luke Church      East Longmeadow, MA      01028-0381</option>'+
          '<option value="St Luke Greek Orthodox Church      Mooresville, NC      28115-1513">St Luke Greek Orthodox Church      Mooresville, NC      28115-1513</option>'+
          '<option value="St Luke the Evangelist Church      Columbia, MO      65201-6277">St Luke the Evangelist Church      Columbia, MO      65201-6277</option>'+
          '<option value="St Mark Church      Belleview, FL      34420">St Mark Church      Belleview, FL      34420</option>'+
          '<option value="St Mark Church      Boca Raton, FL      33431-4323">St Mark Church      Boca Raton, FL      33431-4323</option>'+
          '<option value="St Markella Church      Wantagh, NY      11793-3352">St Markella Church      Wantagh, NY      11793-3352</option>'+
          '<option value="St Mary Church      Johnstown, PA      15901-2529">St Mary Church      Johnstown, PA      15901-2529</option>'+
          '<option value="St Mary Church      Minneapolis, MN      55408-3334">St Mary Church      Minneapolis, MN      55408-3334</option>'+
          '<option value="St Matthew Church      Blandon, PA      19510-9451">St Matthew Church      Blandon, PA      19510-9451</option>'+
          '<option value="St Nectarios Church      Covina, CA      91722-8459">St Nectarios Church      Covina, CA      91722-8459</option>'+
          '<option value="St Nectarios Church      Palatine, IL      60067-5855">St Nectarios Church      Palatine, IL      60067-5855</option>'+
          '<option value="St Nectarios Church      Roslindale, MA      02131-3025">St Nectarios Church      Roslindale, MA      02131-3025</option>'+
          '<option value="St Nectarios Mission      Pasco, WA      99301-5432">St Nectarios Mission      Pasco, WA      99301-5432</option>'+
          '<option value="St Nektarios Church      Charlotte, NC      28270-0269">St Nektarios Church      Charlotte, NC      28270-0269</option>'+
          '<option value="St Nicholas Albanian Church      Chicago, IL      60639-1031">St Nicholas Albanian Church      Chicago, IL      60639-1031</option>'+
          '<option value="St Nicholas Cathedral      Pittsburgh, PA      15213-3509">St Nicholas Cathedral      Pittsburgh, PA      15213-3509</option>'+
          '<option value="St Nicholas Cathedral      Tarpon Springs, FL      34689-3449">St Nicholas Cathedral      Tarpon Springs, FL      34689-3449</option>'+
          '<option value="St Nicholas Church      Ann Arbor, MI      48103-9634">St Nicholas Church      Ann Arbor, MI      48103-9634</option>'+
          '<option value="St Nicholas Church      Appleton, WI">St Nicholas Church      Appleton, WI</option>'+
          '<option value="St Nicholas Church      Atlantic City, NJ      08404-0641">St Nicholas Church      Atlantic City, NJ      08404-0641</option>'+
          '<option value="St Nicholas Church      Baltimore, MD      21224">St Nicholas Church      Baltimore, MD      21224</option>'+
          '<option value="St Nicholas Church      Bethlehem, PA      18018-3416">St Nicholas Church      Bethlehem, PA      18018-3416</option>'+
          '<option value="St Nicholas Church      Clinton, MA      01510-0098">St Nicholas Church      Clinton, MA      01510-0098</option>'+
          '<option value="St Nicholas Church      Corpus Christi, TX      78403-0343">St Nicholas Church      Corpus Christi, TX      78403-0343</option>'+
          '<option value="St Nicholas Church      El Paso, TX      79912-5802">St Nicholas Church      El Paso, TX      79912-5802</option>'+
          '<option value="St Nicholas Church      Enfield, CT      06083-1155">St Nicholas Church      Enfield, CT      06083-1155</option>'+
          '<option value="St Nicholas Church      Fort Pierce, FL      34981-5644">St Nicholas Church      Fort Pierce, FL      34981-5644</option>'+
          '<option value="St Nicholas Church      Grand Jct, CO      81506-5437">St Nicholas Church      Grand Jct, CO      81506-5437</option>'+
          '<option value="St Nicholas Church      Jamestown, NY      14702-0264">St Nicholas Church      Jamestown, NY      14702-0264</option>'+
          '<option value="St Nicholas Church      Lexington, MA      02420-5308">St Nicholas Church      Lexington, MA      02420-5308</option>'+
          '<option value="St Nicholas Church      Lorain, OH      44053-3034">St Nicholas Church      Lorain, OH      44053-3034</option>'+
          '<option value="St Nicholas Church      Manchester, NH      03104-5741">St Nicholas Church      Manchester, NH      03104-5741</option>'+
          '<option value="St Nicholas Church      Newburgh, NY      12550-0204">St Nicholas Church      Newburgh, NY      12550-0204</option>'+
          '<option value="St Nicholas Church      Northridge, CA      91325-1901">St Nicholas Church      Northridge, CA      91325-1901</option>'+
          '<option value="St Nicholas Church      Oak Lawn, IL      60453-4845">St Nicholas Church      Oak Lawn, IL      60453-4845</option>'+
          '<option value="St Nicholas Church      Portsmouth, NH      03801-5448">St Nicholas Church      Portsmouth, NH      03801-5448</option>'+
          '<option value="St Nicholas Church      Rutland, VT      05702-0939">St Nicholas Church      Rutland, VT      05702-0939</option>'+
          '<option value="St Nicholas Church      Saint Louis, MO      63108-1401">St Nicholas Church      Saint Louis, MO      63108-1401</option>'+
          '<option value="St Nicholas Church      San Jose, CA      95126-1402">St Nicholas Church      San Jose, CA      95126-1402</option>'+
          '<option value="St Nicholas Church      Spartanburg, SC      29304-1107">St Nicholas Church      Spartanburg, SC      29304-1107</option>'+
          '<option value="St Nicholas Church      Tacoma, WA      98405-4460">St Nicholas Church      Tacoma, WA      98405-4460</option>'+
          '<option value="St Nicholas Church      Temecula, CA      92590-3404">St Nicholas Church      Temecula, CA      92590-3404</option>'+
          '<option value="St Nicholas Church      Troy, MI      48098-4500">St Nicholas Church      Troy, MI      48098-4500</option>'+
          '<option value="St Nicholas Church      Virginia Beach, VA      23451-6121">St Nicholas Church      Virginia Beach, VA      23451-6121</option>'+
          '<option value="St Nicholas Church      Waco, TX      76707-3522">St Nicholas Church      Waco, TX      76707-3522</option>'+
          '<option value="St Nicholas Church      West Babylon, NY      11704-7821">St Nicholas Church      West Babylon, NY      11704-7821</option>'+
          '<option value="St Nicholas Church      Wilmington, NC      28403-3202">St Nicholas Church      Wilmington, NC      28403-3202</option>'+
          '<option value="St Nicholas Church      Wyckoff, NJ      07481-2543">St Nicholas Church      Wyckoff, NJ      07481-2543</option>'+
          '<option value="St Nicholas Church      Youngstown, OH      44503-1623">St Nicholas Church      Youngstown, OH      44503-1623</option>'+
          '<option value="St Nicholas Church (was located inWorld Trade Ctr)      Brooklyn, NY      11234">St Nicholas Church (was located inWorld Trade Ctr)      Brooklyn, NY      11234</option>'+
          '<option value="St Nicholas Shrine Church      Flushing, NY      11358-3037">St Nicholas Shrine Church      Flushing, NY      11358-3037</option>'+
          '<option value="St Panteleimon Chapel      Lexington, MI      48450-8913">St Panteleimon Chapel      Lexington, MI      48450-8913</option>'+
          '<option value="St Paraskevi Shrine Church      Greenlawn, NY      11740-1512">St Paraskevi Shrine Church      Greenlawn, NY      11740-1512</option>'+
          '<option value="St Paul Cathedral      Hempstead, NY      11550-2050">St Paul Cathedral      Hempstead, NY      11550-2050</option>'+
          '<option value="St Paul Church      Irvine, CA      92604-8606">St Paul Church      Irvine, CA      92604-8606</option>'+
          '<option value="St Paul Church      North Royalton, OH      44133-3121">St Paul Church      North Royalton, OH      44133-3121</option>'+
          '<option value="St Paul Church      Savannah, GA      31401-6738">St Paul Church      Savannah, GA      31401-6738</option>'+
          '<option value="St Peter Church      Danville, VA      24543-3392">St Peter Church      Danville, VA      24543-3392</option>'+
          '<option value="St Peter the Apostle Church      Bronx, NY      10463-5514">St Peter the Apostle Church      Bronx, NY      10463-5514</option>'+
          '<option value="St Philip Church      Nashua, NH      03062-1314">St Philip Church      Nashua, NH      03062-1314</option>'+
          '<option value="St Philothea Church      Watkinsville, GA      30677-1580">St Philothea Church      Watkinsville, GA      30677-1580</option>'+
          '<option value="St Photios Nathional Shrine      St Augustine, FL      32085-1960">St Photios Nathional Shrine      St Augustine, FL      32085-1960</option>'+
          '<option value="St Sophia Cathedral      Los Angeles, CA      90006-4310">St Sophia Cathedral      Los Angeles, CA      90006-4310</option>'+
          '<option value="St Sophia Cathedral      Miami, FL      33129-2023">St Sophia Cathedral      Miami, FL      33129-2023</option>'+
          '<option value="St Sophia Cathedral      Washington, DC      20007-1424">St Sophia Cathedral      Washington, DC      20007-1424</option>'+
          '<option value="St Sophia Church      Albany, NY      12208-1643">St Sophia Church      Albany, NY      12208-1643</option>'+
          '<option value="St Sophia Church      Bellingham, WA      98225">St Sophia Church      Bellingham, WA      98225</option>'+
          '<option value="St Sophia Church      Elgin, IL      60123-9307">St Sophia Church      Elgin, IL      60123-9307</option>'+
          '<option value="St Sophia Church      New London, CT      06320-6205">St Sophia Church      New London, CT      06320-6205</option>'+
          '<option value="St Sophia Church      San Antonio, TX      78212-3738">St Sophia Church      San Antonio, TX      78212-3738</option>'+
          '<option value="St Sophia Church      Syracuse , NY      13224-2254">St Sophia Church      Syracuse , NY      13224-2254</option>'+
          '<option value="St Sophia Greek Orthodox Church      Winter Haven, FL      33883-7424">St Sophia Greek Orthodox Church      Winter Haven, FL      33883-7424</option>'+
          '<option value="St Sophia Ss Faith Hope &amp; Agape Church      Jeffersonville, PA      19403-5212">St Sophia Ss Faith Hope &amp; Agape Church      Jeffersonville, PA      19403-5212</option>'+
          '<option value="St Spyridon Cathedral      Worcester, MA      01609-1908">St Spyridon Cathedral      Worcester, MA      01609-1908</option>'+
          '<option value="St Spyridon Chapel      Troy, MI      48084-4703">St Spyridon Chapel      Troy, MI      48084-4703</option>'+
          '<option value="St Spyridon Church      Clarksburg, WV      26302-4176">St Spyridon Church      Clarksburg, WV      26302-4176</option>'+
          '<option value="St Spyridon Church      Monessen, PA      15062-1933">St Spyridon Church      Monessen, PA      15062-1933</option>'+
          '<option value="St Spyridon Church      New York, NY      10033-4812">St Spyridon Church      New York, NY      10033-4812</option>'+
          '<option value="St Spyridon Church      Newport, RI      02840-0400">St Spyridon Church      Newport, RI      02840-0400</option>'+
          '<option value="St Spyridon Church      Palos Heights, IL      60463-1855">St Spyridon Church      Palos Heights, IL      60463-1855</option>'+
          '<option value="St Spyridon Church      San Diego, CA      92103-4546">St Spyridon Church      San Diego, CA      92103-4546</option>'+
          '<option value="St Spyridon Church      Sheboygan, WI      53081-5337">St Spyridon Church      Sheboygan, WI      53081-5337</option>'+
          '<option value="St Spyridon Church      Upland, CA      91785-1327">St Spyridon Church      Upland, CA      91785-1327</option>'+
          '<option value="St Spyridon Greek Orthodox Church      Loveland, CO      80538-2659">St Spyridon Greek Orthodox Church      Loveland, CO      80538-2659</option>'+
          '<option value="St Stefanos Church      St Petersburg, FL      33710-1262">St Stefanos Church      St Petersburg, FL      33710-1262</option>'+
          '<option value="St Theodore Church      Lanham, MD      20706-3808">St Theodore Church      Lanham, MD      20706-3808</option>'+
          '<option value="St Thomas Church      Cherry Hill, NJ      08002-2635">St Thomas Church      Cherry Hill, NJ      08002-2635</option>'+
          '<option value="St Vasilios Church      Newport, NH      03773-0428">St Vasilios Church      Newport, NH      03773-0428</option>'+
          '<option value="St Vasilios Church      Peabody, MA      01960-4496">St Vasilios Church      Peabody, MA      01960-4496</option>'+
          '<option value="St Vasilios Church      Watertown, NY      13601-3406">St Vasilios Church      Watertown, NY      13601-3406</option>'+
          '<option value="Sts. Anargyroi Church      Marlborough, MA      01752-0381">Sts. Anargyroi Church      Marlborough, MA      01752-0381</option>'+
          '<option value="Sts. Anargyroi Church      New York, NY      10040-4505">Sts. Anargyroi Church      New York, NY      10040-4505</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Brooklyn, NY      11201-5005">Sts. Constantine &amp; Helen Cathedral      Brooklyn, NY      11201-5005</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Cleveland, OH      44118-1330">Sts. Constantine &amp; Helen Cathedral      Cleveland, OH      44118-1330</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Honolulu, HI      96822-3562">Sts. Constantine &amp; Helen Cathedral      Honolulu, HI      96822-3562</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Merrillville, IN      46410-5404">Sts. Constantine &amp; Helen Cathedral      Merrillville, IN      46410-5404</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Richmond, VA      23221-2658">Sts. Constantine &amp; Helen Cathedral      Richmond, VA      23221-2658</option>'+
          '<option value="Sts. Constantine &amp; Helen Chapel      Battle Creek, MI      49016-0189">Sts. Constantine &amp; Helen Chapel      Battle Creek, MI      49016-0189</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Andover, MA      01810-1232">Sts. Constantine &amp; Helen Church      Andover, MA      01810-1232</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Annapolis, MD      21401-7202">Sts. Constantine &amp; Helen Church      Annapolis, MD      21401-7202</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Boise, ID      83702-4705">Sts. Constantine &amp; Helen Church      Boise, ID      83702-4705</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cambridge, MA      02139-3965">Sts. Constantine &amp; Helen Church      Cambridge, MA      02139-3965</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cardiff-By-The-Sea, CA      92007-1525">Sts. Constantine &amp; Helen Church      Cardiff-By-The-Sea, CA      92007-1525</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cheyenne, WY      82003-0112">Sts. Constantine &amp; Helen Church      Cheyenne, WY      82003-0112</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Chicopee, MA      01021-0112">Sts. Constantine &amp; Helen Church      Chicopee, MA      01021-0112</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Fayetteville, NC      28305-4626">Sts. Constantine &amp; Helen Church      Fayetteville, NC      28305-4626</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Great Falls, MT      59403-2564">Sts. Constantine &amp; Helen Church      Great Falls, MT      59403-2564</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Jackson Hts, NY      11372-6144">Sts. Constantine &amp; Helen Church      Jackson Hts, NY      11372-6144</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Lancaster, CA      93536-5319">Sts. Constantine &amp; Helen Church      Lancaster, CA      93536-5319</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Mansfield, OH      44903-7200">Sts. Constantine &amp; Helen Church      Mansfield, OH      44903-7200</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Middletown, OH      45044-4712">Sts. Constantine &amp; Helen Church      Middletown, OH      45044-4712</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Monroe, LA      71201-3608">Sts. Constantine &amp; Helen Church      Monroe, LA      71201-3608</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Newport News, VA      23606-3507">Sts. Constantine &amp; Helen Church      Newport News, VA      23606-3507</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Palos Hills, IL      60465-2398">Sts. Constantine &amp; Helen Church      Palos Hills, IL      60465-2398</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Reading, PA      19611-1763">Sts. Constantine &amp; Helen Church      Reading, PA      19611-1763</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Rockford, IL      61107-4039">Sts. Constantine &amp; Helen Church      Rockford, IL      61107-4039</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Swansea, IL      62226-1094">Sts. Constantine &amp; Helen Church      Swansea, IL      62226-1094</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Vallejo, CA      94590-4648">Sts. Constantine &amp; Helen Church      Vallejo, CA      94590-4648</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Vandergrift, PA      15690-1209">Sts. Constantine &amp; Helen Church      Vandergrift, PA      15690-1209</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Webster, MA      01570-0713">Sts. Constantine &amp; Helen Church      Webster, MA      01570-0713</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      West Nyack, NY      10994-2426">Sts. Constantine &amp; Helen Church      West Nyack, NY      10994-2426</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Westland, MI      48185-0032">Sts. Constantine &amp; Helen Church      Westland, MI      48185-0032</option>'+
          '<option value="Sts. Constantine &amp; Helen of Washington Dc      Silver Spring, MD      20905-3801">Sts. Constantine &amp; Helen of Washington Dc      Silver Spring, MD      20905-3801</option>'+
          '<option value="Sts. Constantine and Helen Church      Wauwatosa, WI      53213-1743">Sts. Constantine and Helen Church      Wauwatosa, WI      53213-1743</option>'+
          '<option value="Sts. Markella &amp; Demetrios Church      Ft Walton Beach, FL      32549-2135">Sts. Markella &amp; Demetrios Church      Ft Walton Beach, FL      32549-2135</option>'+
          '<option value="Sts. Markella &amp; Demetrios Church      Mary Esther, FL      32569">Sts. Markella &amp; Demetrios Church      Mary Esther, FL      32569</option>'+
          '<option value="Sts. Mary Magdalene &amp; Markella Church      Bel Air, MD      21014-7575">Sts. Mary Magdalene &amp; Markella Church      Bel Air, MD      21014-7575</option>'+
          '<option value="Sts. Nicholas Constantine &amp; Helen Church      Roseland, NJ      07068">Sts. Nicholas Constantine &amp; Helen Church      Roseland, NJ      07068</option>'+
          '<option value="Sts. Peter &amp; Paul Church      Boulder, CO      80301-3042">Sts. Peter &amp; Paul Church      Boulder, CO      80301-3042</option>'+
          '<option value="Sts. Peter &amp; Paul Church      Glenview, IL      60025-2305">Sts. Peter &amp; Paul Church      Glenview, IL      60025-2305</option>'+
          '<option value="Sts. Peter and Paul Church      Frederick, MD      21701-8518">Sts. Peter and Paul Church      Frederick, MD      21701-8518</option>'+
          '<option value="Sts. Raphael Nicholas &amp; Irene Mission      Palm Harbor, FL      34683-4919">Sts. Raphael Nicholas &amp; Irene Mission      Palm Harbor, FL      34683-4919</option>'+
          '<option value="Sts. Raphael Nicholas and Irene Church      Cumming, GA      30028-0588">Sts. Raphael Nicholas and Irene Church      Cumming, GA      30028-0588</option>'+
          '<option value="Sts. Theodoroi Church      Gloversville, NY      12078-0009">Sts. Theodoroi Church      Gloversville, NY      12078-0009</option>'+
          '<option value="Taxiarchae Archangels Church      Watertown, MA      02472">Taxiarchae Archangels Church      Watertown, MA      02472</option>'+
          '<option value="Taxiarchai Church      Laconia, NH      03247-0086">Taxiarchai Church      Laconia, NH      03247-0086</option>'+
          '<option value="The Archangel Michael Church      Port Washington, NY      11050-4613">The Archangel Michael Church      Port Washington, NY      11050-4613</option>'+
          '<option value="The Twelve Holy Apostles Church      Duluth, MN      55805-2010">The Twelve Holy Apostles Church      Duluth, MN      55805-2010</option>'+
          '<option value="Three Hierarchs Church      Brooklyn, NY      11229-1206">Three Hierarchs Church      Brooklyn, NY      11229-1206</option>'+
          '<option value="Three Hierarchs Church      Champaign, IL      61820-7232">Three Hierarchs Church      Champaign, IL      61820-7232</option>'+
          '<option value="Transfiguration Church      Austin, TX      78746-3101">Transfiguration Church      Austin, TX      78746-3101</option>'+
          '<option value="Transfiguration Church      Charlottesville, VA      22902-4340">Transfiguration Church      Charlottesville, VA      22902-4340</option>'+
          '<option value="Transfiguration Church      Florence, SC      29501-6327">Transfiguration Church      Florence, SC      29501-6327</option>'+
          '<option value="Transfiguration Church      Franklin, NH      03235-1213">Transfiguration Church      Franklin, NH      03235-1213</option>'+
          '<option value="Transfiguration Church      Ogden, UT      84403-2851">Transfiguration Church      Ogden, UT      84403-2851</option>'+
          '<option value="Transfiguration of Christ Church      Corona, NY      11368">Transfiguration of Christ Church      Corona, NY      11368</option>'+
          '<option value="Transfiguration Of Christ Church      Mattituck, NY      11952-0921">Transfiguration Of Christ Church      Mattituck, NY      11952-0921</option>'+
          '<option value="Transfiguration of our Lord Church      Mason City, IA      50401-1700">Transfiguration of our Lord Church      Mason City, IA      50401-1700</option>'+
          '<option value="Transfiguration of Our Saviour Church      Lowell, MA      01854-3501">Transfiguration of Our Saviour Church      Lowell, MA      01854-3501</option>'+
          '<option value="Zoodochos Peghe Church      Bronx, NY      10461-4605">Zoodochos Peghe Church      Bronx, NY      10461-4605</option>'+
          '<option value="Zoodochos Peghe Church      Hot Springs, AR      71901-6827">Zoodochos Peghe Church      Hot Springs, AR      71901-6827</option>'+
          '<option value="Zoodochos Peghe Church      Martins Ferry, OH      43935-1647">Zoodochos Peghe Church      Martins Ferry, OH      43935-1647</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr62 = document.createElement('tr');
        tr62.setAttribute('name', 'tr62'+memNum);
        tr62.setAttribute('id', 'tr62'+memNum);
        mainTableBody.appendChild(tr62);
        var td62 = document.createElement('td');
        td62.setAttribute('id', 'td62'+memNum);
        tr62.appendChild(td62);
        td62.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Chrismation</span><input type="hidden" name="txaMem'+memNum+'Sac2Name" id="txaMem'+memNum+'Sac2Name" value="Chrismation" />';
        var td63 = document.createElement('td');
        td63.setAttribute('id', 'td63'+memNum);
        td63.setAttribute('colspan', '1');
        tr62.appendChild(td63);
        td63.innerHTML = ' <select tabindex="164" name="cboMember'+memNum+'Sac2" id="cboMember'+memNum+'Sac2" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td64 = document.createElement('td');
        td64.setAttribute('id', 'td64'+memNum);
        td64.setAttribute('colspan', '1');
        tr62.appendChild(td64);
        td64.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" autocomplete="off" value="mm/dd/yyyy" title="enter the chrismation date" name="dteMem'+memNum+'Sac2Date" id="dteMem'+memNum+'Sac2Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac2Date');
        formTabIndex = formTabIndex + 1;
        var td65 = document.createElement('td');
        td65.setAttribute('id', 'td65'+memNum);
        td65.setAttribute('colspan', '2');
        tr62.appendChild(td65);
        td65.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac2Place" id="cboMem'+memNum+'Sac2Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="All Holy Spirit Church      Omaha, NE      68127-3549">All Holy Spirit Church      Omaha, NE      68127-3549</option>'+
          '<option value="All St s Church      Canonsburg, PA      15317-2437">All St s Church      Canonsburg, PA      15317-2437</option>'+
          '<option value="All St s Church      Joliet, IL      60435-7498">All St s Church      Joliet, IL      60435-7498</option>'+
          '<option value="All St s Church      Peoria, IL      61603-3329">All St s Church      Peoria, IL      61603-3329</option>'+
          '<option value="All St s Church      Weirton, WV      26062-0128">All St s Church      Weirton, WV      26062-0128</option>'+
          '<option value="Annunciation &amp; Agia Paraskevi Church      New Buffalo, MI      49117-0093">Annunciation &amp; Agia Paraskevi Church      New Buffalo, MI      49117-0093</option>'+
          '<option value="Annunciation Cathedral      Atlanta, GA      30329-2709">Annunciation Cathedral      Atlanta, GA      30329-2709</option>'+
          '<option value="Annunciation Cathedral      Baltimore, MD      21201-5700">Annunciation Cathedral      Baltimore, MD      21201-5700</option>'+
          '<option value="Annunciation Cathedral      Brookline, MA      02445-7414">Annunciation Cathedral      Brookline, MA      02445-7414</option>'+
          '<option value="Annunciation Cathedral      Chicago, IL      60610-2699">Annunciation Cathedral      Chicago, IL      60610-2699</option>'+
          '<option value="Annunciation Cathedral      Columbus, OH      43215-2068">Annunciation Cathedral      Columbus, OH      43215-2068</option>'+
          '<option value="Annunciation Cathedral      Detroit, MI      48226-2990">Annunciation Cathedral      Detroit, MI      48226-2990</option>'+
          '<option value="Annunciation Cathedral      Housto, TX      77006-4326">Annunciation Cathedral      Housto, TX      77006-4326</option>'+
          '<option value="Annunciation Cathedral      Norfolk, VA      23505-4002">Annunciation Cathedral      Norfolk, VA      23505-4002</option>'+
          '<option value="Annunciation Cathedral      San Francisco, CA      94103-2320">Annunciation Cathedral      San Francisco, CA      94103-2320</option>'+
          '<option value="Annunciation Church      Akron, OH      44304-1518">Annunciation Church      Akron, OH      44304-1518</option>'+
          '<option value="Annunciation Church      Brockton, MA      02301-1340">Annunciation Church      Brockton, MA      02301-1340</option>'+
          '<option value="Annunciation Church      Buffalo, NY      14222-2018">Annunciation Church      Buffalo, NY      14222-2018</option>'+
          '<option value="Annunciation Church      Chattanooga, TN      37404-1104">Annunciation Church      Chattanooga, TN      37404-1104</option>'+
          '<option value="Annunciation Church      Cleveland, OH      44113-3609">Annunciation Church      Cleveland, OH      44113-3609</option>'+
          '<option value="Annunciation Church      Cranston, RI      02920-9320">Annunciation Church      Cranston, RI      02920-9320</option>'+
          '<option value="Annunciation Church      Dayton, OH      45405-4705">Annunciation Church      Dayton, OH      45405-4705</option>'+
          '<option value="Annunciation Church      Decatur, IL      62522-2126">Annunciation Church      Decatur, IL      62522-2126</option>'+
          '<option value="Annunciation Church      Dover, NH      03820-3753">Annunciation Church      Dover, NH      03820-3753</option>'+
          '<option value="Annunciation Church      Elkins Park, PA      19027-2306">Annunciation Church      Elkins Park, PA      19027-2306</option>'+
          '<option value="Annunciation Church      Fort Myers, FL      33919-5116">Annunciation Church      Fort Myers, FL      33919-5116</option>'+
          '<option value="Annunciation Church      Kalamazoo, MI      49007-5053">Annunciation Church      Kalamazoo, MI      49007-5053</option>'+
          '<option value="Annunciation Church      Kankakee, IL      60901-3761">Annunciation Church      Kankakee, IL      60901-3761</option>'+
          '<option value="Annunciation Church      Kansas City, MO      64145-1116">Annunciation Church      Kansas City, MO      64145-1116</option>'+
          '<option value="Annunciation Church      Lancaster, PA      17603-5498">Annunciation Church      Lancaster, PA      17603-5498</option>'+
          '<option value="Annunciation Church      Lincoln, NE      68505-2286">Annunciation Church      Lincoln, NE      68505-2286</option>'+
          '<option value="Annunciation Church      Little Rock, AR      72211-2312">Annunciation Church      Little Rock, AR      72211-2312</option>'+
          '<option value="Annunciation Church      Memphis, TN      38122-5107">Annunciation Church      Memphis, TN      38122-5107</option>'+
          '<option value="Annunciation Church      Milwaukee, WI      53225-4812">Annunciation Church      Milwaukee, WI      53225-4812</option>'+
          '<option value="Annunciation Church      Missoula, MT      59801-3936">Annunciation Church      Missoula, MT      59801-3936</option>'+
          '<option value="Annunciation Church      Mobile, AL      36604-2131">Annunciation Church      Mobile, AL      36604-2131</option>'+
          '<option value="Annunciation Church      Modesto, CA      95357-8128">Annunciation Church      Modesto, CA      95357-8128</option>'+
          '<option value="Annunciation Church      Montgomery, AL      36107-2207">Annunciation Church      Montgomery, AL      36107-2207</option>'+
          '<option value="Annunciation Church      Muskegon, MI      49444-9744">Annunciation Church      Muskegon, MI      49444-9744</option>'+
          '<option value="Annunciation Church      New York, NY      10024-1011">Annunciation Church      New York, NY      10024-1011</option>'+
          '<option value="Annunciation Church      Newburyport, MA      01950-0775">Annunciation Church      Newburyport, MA      01950-0775</option>'+
          '<option value="Annunciation Church      North Miami, FL      33168-4529">Annunciation Church      North Miami, FL      33168-4529</option>'+
          '<option value="Annunciation Church      Pensacola, FL      32501">Annunciation Church      Pensacola, FL      32501</option>'+
          '<option value="Annunciation Church      Sacramento, CA      95816-3810">Annunciation Church      Sacramento, CA      95816-3810</option>'+
          '<option value="Annunciation Church      Scranton, PA      18501-0021">Annunciation Church      Scranton, PA      18501-0021</option>'+
          '<option value="Annunciation Church      Stamford, CT      06905-1495">Annunciation Church      Stamford, CT      06905-1495</option>'+
          '<option value="Annunciation Church      Vestal, NY      13850-3543">Annunciation Church      Vestal, NY      13850-3543</option>'+
          '<option value="Annunciation Church      Wilkes Barre, PA      18701-2304">Annunciation Church      Wilkes Barre, PA      18701-2304</option>'+
          '<option value="Annunciation Church      Winston Salem, NC      27104-3907">Annunciation Church      Winston Salem, NC      27104-3907</option>'+
          '<option value="Annunciation Church      Woburn, MA      01801-4254">Annunciation Church      Woburn, MA      01801-4254</option>'+
          '<option value="Annunciation Church      York, PA      17403-5132">Annunciation Church      York, PA      17403-5132</option>'+
          '<option value="Annunciation Greek Orthodox Church      Ft Lauderdale, FL      33309">Annunciation Greek Orthodox Church      Ft Lauderdale, FL      33309</option>'+
          '<option value="Annunciation Greek Orthodox Church      Rochester, NY      14607">Annunciation Greek Orthodox Church      Rochester, NY      14607</option>'+
          '<option value="Annunciation of the Theotokos Church      McKeesport, PA      15131-1556">Annunciation of the Theotokos Church      McKeesport, PA      15131-1556</option>'+
          '<option value="Annunciation of the Virgin Mary Church      New Kensington, PA      15068-0526">Annunciation of the Virgin Mary Church      New Kensington, PA      15068-0526</option>'+
          '<option value="Archangel Gabriel Orthodox Church      Traverse City, MI      49696-6350">Archangel Gabriel Orthodox Church      Traverse City, MI      49696-6350</option>'+
          '<option value="Archangel Michael Chapel      Atlanta, GA      30329-3377">Archangel Michael Chapel      Atlanta, GA      30329-3377</option>'+
          '<option value="Archangel Michael Church      Campbell, OH      44405-1454">Archangel Michael Church      Campbell, OH      44405-1454</option>'+
          '<option value="Archangel Michael Church      Colorado Springs, CO      80907-7165">Archangel Michael Church      Colorado Springs, CO      80907-7165</option>'+
          '<option value="Archangel Michael Church      Iverness, FL      34451-0241">Archangel Michael Church      Iverness, FL      34451-0241</option>'+
          '<option value="Archangels Church      Stamford, CT      06905-4713">Archangels Church      Stamford, CT      06905-4713</option>'+
          '<option value="Ascension Cathedral      Oakland, CA      94602-2535">Ascension Cathedral      Oakland, CA      94602-2535</option>'+
          '<option value="Ascension Church      Fairview, NJ      07022-2003">Ascension Church      Fairview, NJ      07022-2003</option>'+
          '<option value="Ascension of Our Lord Church      Lincolnshire, IL      60069-2403">Ascension of Our Lord Church      Lincolnshire, IL      60069-2403</option>'+
          '<option value="Assumption Cathedral      Denver, CO      80246-1301">Assumption Cathedral      Denver, CO      80246-1301</option>'+
          '<option value="Assumption Church      Bayard, NE      69334-0550">Assumption Church      Bayard, NE      69334-0550</option>'+
          '<option value="Assumption Church      Chicago, IL      60644-5089">Assumption Church      Chicago, IL      60644-5089</option>'+
          '<option value="Assumption Church      Danbury, CT      06811-4542">Assumption Church      Danbury, CT      06811-4542</option>'+
          '<option value="Assumption Church      East Moline, IL      61244-4256">Assumption Church      East Moline, IL      61244-4256</option>'+
          '<option value="Assumption Church      Galveston, TX      77553-0655">Assumption Church      Galveston, TX      77553-0655</option>'+
          '<option value="Assumption Church      Grand Blanc, MI      48439-8311">Assumption Church      Grand Blanc, MI      48439-8311</option>'+
          '<option value="Assumption Church      Hegewisch, IL      60633-1847">Assumption Church      Hegewisch, IL      60633-1847</option>'+
          '<option value="Assumption Church      Homer Glen, IL      60491">Assumption Church      Homer Glen, IL      60491</option>'+
          '<option value="Assumption Church      Ipswich, MA      01938-0006">Assumption Church      Ipswich, MA      01938-0006</option>'+
          '<option value="Assumption Church      Louisville, KY      40242-4536">Assumption Church      Louisville, KY      40242-4536</option>'+
          '<option value="Assumption Church      Madison, WI      53704-4904">Assumption Church      Madison, WI      53704-4904</option>'+
          '<option value="Assumption Church      Manchester, NH      03109">Assumption Church      Manchester, NH      03109</option>'+
          '<option value="Assumption Church      Marquette, MI      49855-4339">Assumption Church      Marquette, MI      49855-4339</option>'+
          '<option value="Assumption Church      Morgantown, WV      26505-5525">Assumption Church      Morgantown, WV      26505-5525</option>'+
          '<option value="Assumption Church      Pawtucket, RI      02860-3205">Assumption Church      Pawtucket, RI      02860-3205</option>'+
          '<option value="Assumption Church      Pocatello, ID      83205-4567">Assumption Church      Pocatello, ID      83205-4567</option>'+
          '<option value="Assumption Church      Port Jefferson, NY      11777-2074">Assumption Church      Port Jefferson, NY      11777-2074</option>'+
          '<option value="Assumption Church      Price, UT      84501-0688">Assumption Church      Price, UT      84501-0688</option>'+
          '<option value="Assumption Church      San Angelo, TX      76903-7224">Assumption Church      San Angelo, TX      76903-7224</option>'+
          '<option value="Assumption Church      Scottsdale, AZ      85260-5211">Assumption Church      Scottsdale, AZ      85260-5211</option>'+
          '<option value="Assumption Church      Seattle, WA      98122-2515">Assumption Church      Seattle, WA      98122-2515</option>'+
          '<option value="Assumption Church      Somersworth, NH      03878-0110">Assumption Church      Somersworth, NH      03878-0110</option>'+
          '<option value="Assumption Church      St Clair Shores, MI      48080-2464">Assumption Church      St Clair Shores, MI      48080-2464</option>'+
          '<option value="Assumption Church      Town & Country, MO      63131-1405">Assumption Church      Town & Country, MO      63131-1405</option>'+
          '<option value="Assumption Church      Windham, NY      12496">Assumption Church      Windham, NY      12496</option>'+
          '<option value="Assumption Church of the Blessed Virgin      Springfield, OH      45505-1192">Assumption Church of the Blessed Virgin      Springfield, OH      45505-1192</option>'+
          '<option value="Assumption of the Blessed Virgin Mary Church      Long Beach, CA      90814-1900">Assumption of the Blessed Virgin Mary Church      Long Beach, CA      90814-1900</option>'+
          '<option value="Assumption of the Virgin Mary Church      Dracut, MA      01826-3147">Assumption of the Virgin Mary Church      Dracut, MA      01826-3147</option>'+
          '<option value="Christ the Savior Orthodox Mission      Spring Hill, FL      34604-0116">Christ the Savior Orthodox Mission      Spring Hill, FL      34604-0116</option>'+
          '<option value="Church of Our Saviour      Rye, NY      10580-1981">Church of Our Saviour      Rye, NY      10580-1981</option>'+
          '<option value="Church of the Holy Resurrection      Brookville, NY      11545-2124">Church of the Holy Resurrection      Brookville, NY      11545-2124</option>'+
          '<option value="Church of the Resurrection      Castro Valley, CA      94546-4712">Church of the Resurrection      Castro Valley, CA      94546-4712</option>'+
          '<option value="Dormition of The Mother Of God Church      Burlington, VT      05402-8122">Dormition of The Mother Of God Church      Burlington, VT      05402-8122</option>'+
          '<option value="Dormition of the Theotokos Church      Greensboro, NC      27410-4504">Dormition of the Theotokos Church      Greensboro, NC      27410-4504</option>'+
          '<option value="Dormition of the Theotokos Church      Oakmont, PA      15139-2114">Dormition of the Theotokos Church      Oakmont, PA      15139-2114</option>'+
          '<option value="Dormition of the Virgin Mary Church      Somerville, MA      02143-2841">Dormition of the Virgin Mary Church      Somerville, MA      02143-2841</option>'+
          '<option value="Dormition of the Virgin Mary Church      Winchester, VA      22601-2807">Dormition of the Virgin Mary Church      Winchester, VA      22601-2807</option>'+
          '<option value="Evangelismos Church      Easton, PA      18042">Evangelismos Church      Easton, PA      18042</option>'+
          '<option value="Evangelismos Church      Farrell, PA      16121-1871">Evangelismos Church      Farrell, PA      16121-1871</option>'+
          '<option value="Evangelismos Church      Philadelphia, PA      19149-2906">Evangelismos Church      Philadelphia, PA      19149-2906</option>'+
          '<option value="Evangelismos Tis Theotokou Church      Jersey City, NJ      07306-2411">Evangelismos Tis Theotokou Church      Jersey City, NJ      07306-2411</option>'+
          '<option value="Greek Orthodox Mission of South Orange County      San Juan Capistrano, CA      92675">Greek Orthodox Mission of South Orange County      San Juan Capistrano, CA      92675</option>'+
          '<option value="Greek Orthodox Mission Parish of Utah      Salt Lake City, UT      84110">Greek Orthodox Mission Parish of Utah      Salt Lake City, UT      84110</option>'+
          '<option value="Greek Orthodox Parish of Loudoun County      Dulles, VA      20166-6856">Greek Orthodox Parish of Loudoun County      Dulles, VA      20166-6856</option>'+
          '<option value="Holy Anargyroi/Sts. Cosmas &amp; Damianos Church      Rochester, MN      55902-6231">Holy Anargyroi/Sts. Cosmas &amp; Damianos Church      Rochester, MN      55902-6231</option>'+
          '<option value="Holy Apostles / Sts. Peter &amp; Paul Church      Haverhill, MA      01830-5690">Holy Apostles / Sts. Peter &amp; Paul Church      Haverhill, MA      01830-5690</option>'+
          '<option value="Holy Apostles Church      Cheyenne, WY      82009">Holy Apostles Church      Cheyenne, WY      82009</option>'+
          '<option value="Holy Apostles Church      Indianapolis, IN      46205-1825">Holy Apostles Church      Indianapolis, IN      46205-1825</option>'+
          '<option value="Holy Apostles Church      Westchester, IL      60154-4999">Holy Apostles Church      Westchester, IL      60154-4999</option>'+
          '<option value="Holy Apostles Greek Orthodox Church      Shoreline, WA      98133-3657">Holy Apostles Greek Orthodox Church      Shoreline, WA      98133-3657</option>'+
          '<option value="Holy Apostles Mission Church      Greenville, NC      27833-1055">Holy Apostles Mission Church      Greenville, NC      27833-1055</option>'+
          '<option value="Holy Cross Church      Belmont, CA      94002-1604">Holy Cross Church      Belmont, CA      94002-1604</option>'+
          '<option value="Holy Cross Church      Brooklyn, NY      11209-4327">Holy Cross Church      Brooklyn, NY      11209-4327</option>'+
          '<option value="Holy Cross Church      Farmington Hills, MI      48336-1381">Holy Cross Church      Farmington Hills, MI      48336-1381</option>'+
          '<option value="Holy Cross Church      Flagstaff, AZ      86003-2164">Holy Cross Church      Flagstaff, AZ      86003-2164</option>'+
          '<option value="Holy Cross Church      Justice, IL      60458">Holy Cross Church      Justice, IL      60458</option>'+
          '<option value="Holy Cross Church      Macon, GA      31201-6876">Holy Cross Church      Macon, GA      31201-6876</option>'+
          '<option value="Holy Cross Church      Middletown, NY      10941-4031">Holy Cross Church      Middletown, NY      10941-4031</option>'+
          '<option value="Holy Cross Church      Pittsburgh, PA      15228-1015">Holy Cross Church      Pittsburgh, PA      15228-1015</option>'+
          '<option value="Holy Cross Church      Stroudsburg, PA      18360-2337">Holy Cross Church      Stroudsburg, PA      18360-2337</option>'+
          '<option value="Holy Cross Church      Whitestone, NY      11357-1807">Holy Cross Church      Whitestone, NY      11357-1807</option>'+
          '<option value="Holy Cross Church      Wichita Falls, TX      76309-2902">Holy Cross Church      Wichita Falls, TX      76309-2902</option>'+
          '<option value="Holy Cross/Ss Constantine &amp; Helen Church      Huntsville, AL      35816-3133">Holy Cross/Ss Constantine &amp; Helen Church      Huntsville, AL      35816-3133</option>'+
          '<option value="Holy Mother of God Church      Tallahassee, FL      32308-5303">Holy Mother of God Church      Tallahassee, FL      32308-5303</option>'+
          '<option value="Holy Resurrection Church      Hilton Head, SC      29925-2888">Holy Resurrection Church      Hilton Head, SC      29925-2888</option>'+
          '<option value="Holy Spirit Church      Rochester, NY      14620-2315">Holy Spirit Church      Rochester, NY      14620-2315</option>'+
          '<option value="Holy Taxiarhai and St Haralambos Church      Niles, IL      60714-4503">Holy Taxiarhai and St Haralambos Church      Niles, IL      60714-4503</option>'+
          '<option value="Holy Transfiguration Church      Anchorage, AK      99507-4256">Holy Transfiguration Church      Anchorage, AK      99507-4256</option>'+
          '<option value="Holy Transfiguration Church      Marietta, GA      30066-4660">Holy Transfiguration Church      Marietta, GA      30066-4660</option>'+
          '<option value="Holy Transfiguration Church      Sioux Falls, SD      57105-2726">Holy Transfiguration Church      Sioux Falls, SD      57105-2726</option>'+
          '<option value="Holy Transfiguration Mission      Columbus, GA      31904">Holy Transfiguration Mission      Columbus, GA      31904</option>'+
          '<option value="Holy Trinity - St Nicholas Church      Cincinnati, OH      45224-1331">Holy Trinity - St Nicholas Church      Cincinnati, OH      45224-1331</option>'+
          '<option value="Holy Trinity - St Nicholas Church      Staten Island, NY      10314-1570">Holy Trinity - St Nicholas Church      Staten Island, NY      10314-1570</option>'+
          '<option value="Holy Trinity &amp; Holy Cross Cathedral      Birmingham, AL      35233-1919">Holy Trinity &amp; Holy Cross Cathedral      Birmingham, AL      35233-1919</option>'+
          '<option value="Holy Trinity &amp; St John the Theologian Church      Jackson, MS      39211">Holy Trinity &amp; St John the Theologian Church      Jackson, MS      39211</option>'+
          '<option value="Holy Trinity Cathedral      Camp Hill, PA      17011-1239">Holy Trinity Cathedral      Camp Hill, PA      17011-1239</option>'+
          '<option value="Holy Trinity Cathedral      New Orleans, LA      70122-1337">Holy Trinity Cathedral      New Orleans, LA      70122-1337</option>'+
          '<option value="Holy Trinity Cathedral      New York, NY      10021-3797">Holy Trinity Cathedral      New York, NY      10021-3797</option>'+
          '<option value="Holy Trinity Cathedral      Phoenix, AZ      85016-1415">Holy Trinity Cathedral      Phoenix, AZ      85016-1415</option>'+
          '<option value="Holy Trinity Cathedral      Portland, OR      97232-2501">Holy Trinity Cathedral      Portland, OR      97232-2501</option>'+
          '<option value="Holy Trinity Cathedral      Salt Lake City, UT      84101-1703">Holy Trinity Cathedral      Salt Lake City, UT      84101-1703</option>'+
          '<option value="Holy Trinity Cathedral      Toledo, OH      43604-1737">Holy Trinity Cathedral      Toledo, OH      43604-1737</option>'+
          '<option value="Holy Trinity Church      Altoona, PA      16601-3339">Holy Trinity Church      Altoona, PA      16601-3339</option>'+
          '<option value="Holy Trinity Church      Ambridge, PA      15003-1418">Holy Trinity Church      Ambridge, PA      15003-1418</option>'+
          '<option value="Holy Trinity Church      Asheville, NC      28814-8369">Holy Trinity Church      Asheville, NC      28814-8369</option>'+
          '<option value="Holy Trinity Church      Augusta, GA      30901-2205">Holy Trinity Church      Augusta, GA      30901-2205</option>'+
          '<option value="Holy Trinity Church      Baton Rouge, LA      70884">Holy Trinity Church      Baton Rouge, LA      70884</option>'+
          '<option value="Holy Trinity Church      Biloxi, MS      39535">Holy Trinity Church      Biloxi, MS      39535</option>'+
          '<option value="Holy Trinity Church      Binghamton, NY      13901-3605">Holy Trinity Church      Binghamton, NY      13901-3605</option>'+
          '<option value="Holy Trinity Church      Bluff City, TN      37618-1868">Holy Trinity Church      Bluff City, TN      37618-1868</option>'+
          '<option value="Holy Trinity Church      Bridgeport, CT      06604-1047">Holy Trinity Church      Bridgeport, CT      06604-1047</option>'+
          '<option value="Holy Trinity Church      Canton, OH      44709-1348">Holy Trinity Church      Canton, OH      44709-1348</option>'+
          '<option value="Holy Trinity Church      Carmel, IN      46032-5513">Holy Trinity Church      Carmel, IN      46032-5513</option>'+
          '<option value="Holy Trinity Church      Casper, WY      82602-1465">Holy Trinity Church      Casper, WY      82602-1465</option>'+
          '<option value="Holy Trinity Church      Charleston, SC      29403-4606">Holy Trinity Church      Charleston, SC      29403-4606</option>'+
          '<option value="Holy Trinity Church      Chicago, IL      60639-1139">Holy Trinity Church      Chicago, IL      60639-1139</option>'+
          '<option value="Holy Trinity Church      Clearwater, FL      33765-4410">Holy Trinity Church      Clearwater, FL      33765-4410</option>'+
          '<option value="Holy Trinity Church      Columbia, SC      29201-2503">Holy Trinity Church      Columbia, SC      29201-2503</option>'+
          '<option value="Holy Trinity Church      Concor, NH      03301-4330">Holy Trinity Church      Concor, NH      03301-4330</option>'+
          '<option value="Holy Trinity Church      Dallas, TX      75240-5412">Holy Trinity Church      Dallas, TX      75240-5412</option>'+
          '<option value="Holy Trinity Church      Danielson, CT      06239-0236">Holy Trinity Church      Danielson, CT      06239-0236</option>'+
          '<option value="Holy Trinity Church      Egg Harbor Township, NJ      08234-9651">Holy Trinity Church      Egg Harbor Township, NJ      08234-9651</option>'+
          '<option value="Holy Trinity Church      Fitchburg, MA      01420-3033">Holy Trinity Church      Fitchburg, MA      01420-3033</option>'+
          '<option value="Holy Trinity Church      Fond Du Lac, WI      54936-0011">Holy Trinity Church      Fond Du Lac, WI      54936-0011</option>'+
          '<option value="Holy Trinity Church      Fort Wayne, IN      46825-2729">Holy Trinity Church      Fort Wayne, IN      46825-2729</option>'+
          '<option value="Holy Trinity Church      Grand Rapids, MI      49503-3815">Holy Trinity Church      Grand Rapids, MI      49503-3815</option>'+
          '<option value="Holy Trinity Church      Hicksville, NY      11801-5321">Holy Trinity Church      Hicksville, NY      11801-5321</option>'+
          '<option value="Holy Trinity Church      Holyoke, MA      01040-5610">Holy Trinity Church      Holyoke, MA      01040-5610</option>'+
          '<option value="Holy Trinity Church      Lansing, MI      48912-2316">Holy Trinity Church      Lansing, MI      48912-2316</option>'+
          '<option value="Holy Trinity Church      Lewiston, ME      04243-1344">Holy Trinity Church      Lewiston, ME      04243-1344</option>'+
          '<option value="Holy Trinity Church      Lowell, MA      01854-4213">Holy Trinity Church      Lowell, MA      01854-4213</option>'+
          '<option value="Holy Trinity Church      Maitland, FL      32751-3159">Holy Trinity Church      Maitland, FL      32751-3159</option>'+
          '<option value="Holy Trinity Church      Nashvill, TN      37220-1517">Holy Trinity Church      Nashvill, TN      37220-1517</option>'+
          '<option value="Holy Trinity Church      New Rochelle, NY      10804-2119">Holy Trinity Church      New Rochelle, NY      10804-2119</option>'+
          '<option value="Holy Trinity Church      Norwich, CT      06360-3517">Holy Trinity Church      Norwich, CT      06360-3517</option>'+
          '<option value="Holy Trinity Church      Pittsburgh, PA      15237">Holy Trinity Church      Pittsburgh, PA      15237</option>'+
          '<option value="Holy Trinity Church      Portland, ME      04101-3808">Holy Trinity Church      Portland, ME      04101-3808</option>'+
          '<option value="Holy Trinity Church      Pt Charlotte, FL      33980-2702">Holy Trinity Church      Pt Charlotte, FL      33980-2702</option>'+
          '<option value="Holy Trinity Church      Raleigh, NC      27612">Holy Trinity Church      Raleigh, NC      27612</option>'+
          '<option value="Holy Trinity Church      Roanoke, VA      24012-3605">Holy Trinity Church      Roanoke, VA      24012-3605</option>'+
          '<option value="Holy Trinity Church      Rock Springs, WY      82901">Holy Trinity Church      Rock Springs, WY      82901</option>'+
          '<option value="Holy Trinity Church      San Francisco, CA      94132-2904">Holy Trinity Church      San Francisco, CA      94132-2904</option>'+
          '<option value="Holy Trinity Church      Sioux City, IA      51101-1818">Holy Trinity Church      Sioux City, IA      51101-1818</option>'+
          '<option value="Holy Trinity Church      Spokane, WA      99205-4769">Holy Trinity Church      Spokane, WA      99205-4769</option>'+
          '<option value="Holy Trinity Church      St Augustine, FL      32084-2718">Holy Trinity Church      St Augustine, FL      32084-2718</option>'+
          '<option value="Holy Trinity Church      Steubenville, OH      43952-5788">Holy Trinity Church      Steubenville, OH      43952-5788</option>'+
          '<option value="Holy Trinity Church      Tulsa, OK      74119-2612">Holy Trinity Church      Tulsa, OK      74119-2612</option>'+
          '<option value="Holy Trinity Church      Waterbury, CT      06708-2903">Holy Trinity Church      Waterbury, CT      06708-2903</option>'+
          '<option value="Holy Trinity Church      Westfield, NJ      07090-1109">Holy Trinity Church      Westfield, NJ      07090-1109</option>'+
          '<option value="Holy Trinity Church      Wichita, KS      67208-3439">Holy Trinity Church      Wichita, KS      67208-3439</option>'+
          '<option value="Holy Trinity Church      Wilmington, DE      19806-4625">Holy Trinity Church      Wilmington, DE      19806-4625</option>'+
          '<option value="Holy Trinity Greek Orthodox Cathedral      Charlotte, NC      28203-5112">Holy Trinity Greek Orthodox Cathedral      Charlotte, NC      28203-5112</option>'+
          '<option value="Kimisis Tis Theotokou Church      Aliquippa, PA      15001-2706">Kimisis Tis Theotokou Church      Aliquippa, PA      15001-2706</option>'+
          '<option value="Kimisis Tis Theotokou Church      Brooklyn, NY      11215-5303">Kimisis Tis Theotokou Church      Brooklyn, NY      11215-5303</option>'+
          '<option value="Kimisis Tis Theotokou Church      Holmdel, NJ      07733-1614">Kimisis Tis Theotokou Church      Holmdel, NJ      07733-1614</option>'+
          '<option value="Kimisis Tis Theotokou Church      island Park, NY      11558">Kimisis Tis Theotokou Church      island Park, NY      11558</option>'+
          '<option value="Kimisis Tis Theotokou Church      Poughkeepsie, NY      12603-3010">Kimisis Tis Theotokou Church      Poughkeepsie, NY      12603-3010</option>'+
          '<option value="Kimisis Tis Theotokou Church      Southampton, NY      11968-3807">Kimisis Tis Theotokou Church      Southampton, NY      11968-3807</option>'+
          '<option value="Kimissis Tis Theotokou Church      Racine, WI      53406-4405">Kimissis Tis Theotokou Church      Racine, WI      53406-4405</option>'+
          '<option value="Koimisis Tis Theotokou Church      Erie, PA      16505-1416">Koimisis Tis Theotokou Church      Erie, PA      16505-1416</option>'+
          '<option value="Maui Orthodox Christian Mission      Kihei, MA      96753">Maui Orthodox Christian Mission      Kihei, MA      96753</option>'+
          '<option value="Nativity of Christ Church      Novato, CA      94949-5481">Nativity of Christ Church      Novato, CA      94949-5481</option>'+
          '<option value="Nativity of the Theotokos Church      Fredericksburg, VA      22407">Nativity of the Theotokos Church      Fredericksburg, VA      22407</option>'+
          '<option value="Nativity of the Virgin Mary Church      Plymouth, MI      48170-2708">Nativity of the Virgin Mary Church      Plymouth, MI      48170-2708</option>'+
          '<option value="Nativity-Assumption of the Virgin Mary Church      Cohasset, MA      02025-1046">Nativity-Assumption of the Virgin Mary Church      Cohasset, MA      02025-1046</option>'+
          '<option value="Panagia Pantovasilissa Church      Lexington, KY      40502-2203">Panagia Pantovasilissa Church      Lexington, KY      40502-2203</option>'+
          '<option value="Presentation of Christ Church      East Pittsburgh, PA      15112-0310">Presentation of Christ Church      East Pittsburgh, PA      15112-0310</option>'+
          '<option value="Prophet Elias Church      Holladay, UT      84117-7633">Prophet Elias Church      Holladay, UT      84117-7633</option>'+
          '<option value="Prophet Elias Church      San Bernardino, CA      92402-0311">Prophet Elias Church      San Bernardino, CA      92402-0311</option>'+
          '<option value="Prophet Elias Church      Santa Cruz, CA      95060-3809">Prophet Elias Church      Santa Cruz, CA      95060-3809</option>'+
          '<option value="Prophet Elias Church      Yonkers, NY      10705-4519">Prophet Elias Church      Yonkers, NY      10705-4519</option>'+
          '<option value="St Andrew Church      Chicago, IL      60660-4899">St Andrew Church      Chicago, IL      60660-4899</option>'+
          '<option value="St Andrew Church      Lubbock, TX      79493-3705">St Andrew Church      Lubbock, TX      79493-3705</option>'+
          '<option value="St Andrew Church      Miami, FL      33156-7456">St Andrew Church      Miami, FL      33156-7456</option>'+
          '<option value="St Andrew Church      Randolph, NJ      07869-1830">St Andrew Church      Randolph, NJ      07869-1830</option>'+
          '<option value="St Andrew Church      South Bend, IN      46635-1124">St Andrew Church      South Bend, IN      46635-1124</option>'+
          '<option value="St Andrew the Apostle Greek Orthodox Church      San Luis Obispo, CA      93405-1540">St Andrew the Apostle Greek Orthodox Church      San Luis Obispo, CA      93405-1540</option>'+
          '<option value="St Anna Church      Flemington, NJ      08822">St Anna Church      Flemington, NJ      08822</option>'+
          '<option value="St Anna Greek Orthodox Church      Roseville, CA      95661-4093">St Anna Greek Orthodox Church      Roseville, CA      95661-4093</option>'+
          '<option value="St Anthony Church      Clairton, PA      15025-0031">St Anthony Church      Clairton, PA      15025-0031</option>'+
          '<option value="St Anthony Church      Pasadena, CA      91107-5613">St Anthony Church      Pasadena, CA      91107-5613</option>'+
          '<option value="St Anthony Church      Reno, NV      89509-5814">St Anthony Church      Reno, NV      89509-5814</option>'+
          '<option value="St Anthony Church      Springfield, IL      62704-3611">St Anthony Church      Springfield, IL      62704-3611</option>'+
          '<option value="St Anthony Church      Vineland, NJ      08360-1911">St Anthony Church      Vineland, NJ      08360-1911</option>'+
          '<option value="St Athanasios Church      Aurora, IL      60504-8776">St Athanasios Church      Aurora, IL      60504-8776</option>'+
          '<option value="St Athanasios Church      Elmira, NY      14904-1706">St Athanasios Church      Elmira, NY      14904-1706</option>'+
          '<option value="St Athanasios Church      Paramus, NJ      07652-1320">St Athanasios Church      Paramus, NJ      07652-1320</option>'+
          '<option value="St Athanasios Hellenic Orthodox Mission      Gulf Shores, AL      36547-3668">St Athanasios Hellenic Orthodox Mission      Gulf Shores, AL      36547-3668</option>'+
          '<option value="St Athanasius the Great Church      Arlington, MA      02476-5966">St Athanasius the Great Church      Arlington, MA      02476-5966</option>'+
          '<option value="St Barbara Church      Durham, NC      27713-6860">St Barbara Church      Durham, NC      27713-6860</option>'+
          '<option value="St Barbara Church      New York, NY      10002-6001">St Barbara Church      New York, NY      10002-6001</option>'+
          '<option value="St Barbara Church      Orange, CT      06477-2514">St Barbara Church      Orange, CT      06477-2514</option>'+
          '<option value="St Barbara Church      Santa Barbara, CA      93111-1313">St Barbara Church      Santa Barbara, CA      93111-1313</option>'+
          '<option value="St Barbara Church      Toms River, NJ      08753-8106">St Barbara Church      Toms River, NJ      08753-8106</option>'+
          '<option value="St Barbara Greek Orthodox Church      Sarasota, FL      34243-4931">St Barbara Greek Orthodox Church      Sarasota, FL      34243-4931</option>'+
          '<option value="St Basil Church      Chicago, IL      60607-3103">St Basil Church      Chicago, IL      60607-3103</option>'+
          '<option value="St Basil Church      San Jose, CA      95120-3413">St Basil Church      San Jose, CA      95120-3413</option>'+
          '<option value="St Basil Church      Stockton, CA      95207-6209">St Basil Church      Stockton, CA      95207-6209</option>'+
          '<option value="St Basil Church      Troy, NY      12180-1243">St Basil Church      Troy, NY      12180-1243</option>'+
          '<option value="St Basil the Great Church      Houston, TX      77077-1647">St Basil the Great Church      Houston, TX      77077-1647</option>'+
          '<option value="St Basil the Great Church      New Haven, CT      06533-0356">St Basil the Great Church      New Haven, CT      06533-0356</option>'+
          '<option value="St Catherine Church      Braintree, MA      02184-1767">St Catherine Church      Braintree, MA      02184-1767</option>'+
          '<option value="St Catherine Church      Greenwood Village, CO      80111-3319">St Catherine Church      Greenwood Village, CO      80111-3319</option>'+
          '<option value="St Catherine Church      Ithaca, NY      14850-4138">St Catherine Church      Ithaca, NY      14850-4138</option>'+
          '<option value="St Catherine Church      West Palm Beach, FL      33405-2736">St Catherine Church      West Palm Beach, FL      33405-2736</option>'+
          '<option value="St Christopher Hellenic Orthodox Church      Peachtree Cty, GA      30269-1933">St Christopher Hellenic Orthodox Church      Peachtree Cty, GA      30269-1933</option>'+
          '<option value="St Demetrios Cathedral      Astoria, NY      11102-1854">St Demetrios Cathedral      Astoria, NY      11102-1854</option>'+
          '<option value="St Demetrios Church      Baltimore, MD      21234-8218">St Demetrios Church      Baltimore, MD      21234-8218</option>'+
          '<option value="St Demetrios Church      Bristol, CT      06010-4936">St Demetrios Church      Bristol, CT      06010-4936</option>'+
          '<option value="St Demetrios Church      Camarillo, CA      93011-1970">St Demetrios Church      Camarillo, CA      93011-1970</option>'+
          '<option value="St Demetrios Church      Chicago, IL      60625-2508">St Demetrios Church      Chicago, IL      60625-2508</option>'+
          '<option value="St Demetrios Church      Concord, CA      94521-1627">St Demetrios Church      Concord, CA      94521-1627</option>'+
          '<option value="St Demetrios Church      Daytona Beach, FL      32118-4250">St Demetrios Church      Daytona Beach, FL      32118-4250</option>'+
          '<option value="St Demetrios Church      Elmhurst, IL      60126-1005">St Demetrios Church      Elmhurst, IL      60126-1005</option>'+
          '<option value="St Demetrios Church      Fall River, MA      02720-2320">St Demetrios Church      Fall River, MA      02720-2320</option>'+
          '<option value="St Demetrios Church      Fort Worth, TX      76164">St Demetrios Church      Fort Worth, TX      76164</option>'+
          '<option value="St Demetrios Church      Ft Lauderdale, FL      33304-4402">St Demetrios Church      Ft Lauderdale, FL      33304-4402</option>'+
          '<option value="St Demetrios Church      Hammond, IN      46324-1813">St Demetrios Church      Hammond, IN      46324-1813</option>'+
          '<option value="St Demetrios Church      Jamaica, NY      11432-1641">St Demetrios Church      Jamaica, NY      11432-1641</option>'+
          '<option value="St Demetrios Church      Jersey City, NJ      07306-2913">St Demetrios Church      Jersey City, NJ      07306-2913</option>'+
          '<option value="St Demetrios Church      Libertyville, IL      60048-4229">St Demetrios Church      Libertyville, IL      60048-4229</option>'+
          '<option value="St Demetrios Church      Merrick, NY      11566-3918">St Demetrios Church      Merrick, NY      11566-3918</option>'+
          '<option value="St Demetrios Church      North Wildwood, NJ      08260-3107">St Demetrios Church      North Wildwood, NJ      08260-3107</option>'+
          '<option value="St Demetrios Church      Parkville, MD      21234-1097">St Demetrios Church      Parkville, MD      21234-1097</option>'+
          '<option value="St Demetrios Church      Perth Amboy, NJ      08861-4723">St Demetrios Church      Perth Amboy, NJ      08861-4723</option>'+
          '<option value="St Demetrios Church      Rocky River, OH      44116-3047">St Demetrios Church      Rocky River, OH      44116-3047</option>'+
          '<option value="St Demetrios Church      Saco, ME      04072-3103">St Demetrios Church      Saco, ME      04072-3103</option>'+
          '<option value="St Demetrios Church      Saginaw, MI      48603-7249">St Demetrios Church      Saginaw, MI      48603-7249</option>'+
          '<option value="St Demetrios Church      Seattle, WA      98112-2115">St Demetrios Church      Seattle, WA      98112-2115</option>'+
          '<option value="St Demetrios Church      Tucson, AZ      85719-2116">St Demetrios Church      Tucson, AZ      85719-2116</option>'+
          '<option value="St Demetrios Church      Union, NJ      07083">St Demetrios Church      Union, NJ      07083</option>'+
          '<option value="St Demetrios Church      Upper Darby, PA      19082-3328">St Demetrios Church      Upper Darby, PA      19082-3328</option>'+
          '<option value="St Demetrios Church      Warren, OH      44482-4214">St Demetrios Church      Warren, OH      44482-4214</option>'+
          '<option value="St Demetrios Church      Waterloo, IA      50702-1501">St Demetrios Church      Waterloo, IA      50702-1501</option>'+
          '<option value="St Demetrios Church      Weston, MA      02493">St Demetrios Church      Weston, MA      02493</option>'+
          '<option value="St Demetrios Church      Willamsburg, VA      23187">St Demetrios Church      Willamsburg, VA      23187</option>'+
          '<option value="St Dionysios Church      Overland Park, KS      66212-3214">St Dionysios Church      Overland Park, KS      66212-3214</option>'+
          '<option value="St Eleftherios Church      New York, NY      10011-1501">St Eleftherios Church      New York, NY      10011-1501</option>'+
          '<option value="St Elias The Prophet Church      Dubuque, IA      52003-8739">St Elias The Prophet Church      Dubuque, IA      52003-8739</option>'+
          '<option value="St Elias The Prophet Church      Santa Fe, NM      87508-9143">St Elias The Prophet Church      Santa Fe, NM      87508-9143</option>'+
          '<option value="St Elizabeth the Wonderworker Church      Gainesville, FL      32653-4318">St Elizabeth the Wonderworker Church      Gainesville, FL      32653-4318</option>'+
          '<option value="St Elpis Church      Hopewell, VA      23860-1204">St Elpis Church      Hopewell, VA      23860-1204</option>'+
          '<option value="St Fanourios Church      Elizabeth, NJ      07201-2544">St Fanourios Church      Elizabeth, NJ      07201-2544</option>'+
          '<option value="St George - St Demetrios Church      New York, NY      10029-0293">St George - St Demetrios Church      New York, NY      10029-0293</option>'+
          '<option value="St George Cathedral      Greenville, SC      29601-2046">St George Cathedral      Greenville, SC      29601-2046</option>'+
          '<option value="St George Cathedral      Hartford, CT      06114-2718">St George Cathedral      Hartford, CT      06114-2718</option>'+
          '<option value="St George Cathedral      Manchester, NH      03104-5306">St George Cathedral      Manchester, NH      03104-5306</option>'+
          '<option value="St George Cathedral      Philadelphia, PA      19107-5731">St George Cathedral      Philadelphia, PA      19107-5731</option>'+
          '<option value="St George Cathedral      Springfield, MA      01104-3332">St George Cathedral      Springfield, MA      01104-3332</option>'+
          '<option value="St George Chapel      Brunswich, GA      31520-8241">St George Chapel      Brunswich, GA      31520-8241</option>'+
          '<option value="St George Church      Albuquerque, NM      87102-3631">St George Church      Albuquerque, NM      87102-3631</option>'+
          '<option value="St George Church      Bakersfield, CA      93301-5315">St George Church      Bakersfield, CA      93301-5315</option>'+
          '<option value="St George Church      Bangor, ME      04401-6132">St George Church      Bangor, ME      04401-6132</option>'+
          '<option value="St George Church      Bloomfield, MI      48302-5019">St George Church      Bloomfield, MI      48302-5019</option>'+
          '<option value="St George Church      Centerville/Hyannis, MA      02632-3022">St George Church      Centerville/Hyannis, MA      02632-3022</option>'+
          '<option value="St George Church      Chicago, IL      60614-1326">St George Church      Chicago, IL      60614-1326</option>'+
          '<option value="St George Church      Clifton, NJ      07013-2206">St George Church      Clifton, NJ      07013-2206</option>'+
          '<option value="St George Church      Dartmouth, MA      02747-0985">St George Church      Dartmouth, MA      02747-0985</option>'+
          '<option value="St George Church      Dekalb, IL      60115-3718">St George Church      Dekalb, IL      60115-3718</option>'+
          '<option value="St George Church      Des Moines, IA      50311-3704">St George Church      Des Moines, IA      50311-3704</option>'+
          '<option value="St George Church      Downey, CA      90241-3720">St George Church      Downey, CA      90241-3720</option>'+
          '<option value="St George Church      Eugene, OR      97408-5018">St George Church      Eugene, OR      97408-5018</option>'+
          '<option value="St George Church      Fresno, CA      93703-2323">St George Church      Fresno, CA      93703-2323</option>'+
          '<option value="St George Church      High Point, NC      27262-4027">St George Church      High Point, NC      27262-4027</option>'+
          '<option value="St George Church      Hollywood, FL      33021-6213">St George Church      Hollywood, FL      33021-6213</option>'+
          '<option value="St George Church      Huntington, WV      25727-2822">St George Church      Huntington, WV      25727-2822</option>'+
          '<option value="St George Church      Keene, NH      03431-0392">St George Church      Keene, NH      03431-0392</option>'+
          '<option value="St George Church      Kingston, NY      12401-5342">St George Church      Kingston, NY      12401-5342</option>'+
          '<option value="St George Church      Knoxville, TN      37919-5245">St George Church      Knoxville, TN      37919-5245</option>'+
          '<option value="St George Church      Lowell, MA      01851-2405">St George Church      Lowell, MA      01851-2405</option>'+
          '<option value="St George Church      Lynchburg, VA      24503-3120">St George Church      Lynchburg, VA      24503-3120</option>'+
          '<option value="St George Church      Lynn, MA      01902-4495">St George Church      Lynn, MA      01902-4495</option>'+
          '<option value="St George Church      Massillon, OH      44646-6718">St George Church      Massillon, OH      44646-6718</option>'+
          '<option value="St George Church      Media, PA      19063-4345">St George Church      Media, PA      19063-4345</option>'+
          '<option value="St George Church      New Britain, CT      06050-1753">St George Church      New Britain, CT      06050-1753</option>'+
          '<option value="St George Church      New Castle, PA      16105-1805">St George Church      New Castle, PA      16105-1805</option>'+
          '<option value="St George Church      New Port Richey, FL      34654-3417">St George Church      New Port Richey, FL      34654-3417</option>'+
          '<option value="St George Church      New York, NY      10019-5101">St George Church      New York, NY      10019-5101</option>'+
          '<option value="St George Church      Norwalk, CT      06851-1133">St George Church      Norwalk, CT      06851-1133</option>'+
          '<option value="St George Church      Ocean City, MD      21842-2739">St George Church      Ocean City, MD      21842-2739</option>'+
          '<option value="St George Church      Ocean, NJ      0+F2987712">St George Church      Ocean, NJ      0+F2987712</option>'+
          '<option value="St George Church      Oklahoma City, OK      73134-6112">St George Church      Oklahoma City, OK      73134-6112</option>'+
          '<option value="St George Church      Palm Desert, CA      92261-4755">St George Church      Palm Desert, CA      92261-4755</option>'+
          '<option value="St George Church      Piscataway, NJ      08854-5620">St George Church      Piscataway, NJ      08854-5620</option>'+
          '<option value="St George Church      Pittsfield, MA      01201-4523">St George Church      Pittsfield, MA      01201-4523</option>'+
          '<option value="St George Church      Port Arthur, TX      77643-3035">St George Church      Port Arthur, TX      77643-3035</option>'+
          '<option value="St George Church      Prescott, AZ      86305-3619">St George Church      Prescott, AZ      86305-3619</option>'+
          '<option value="St George Church      Redding, CA      96001-1090">St George Church      Redding, CA      96001-1090</option>'+
          '<option value="St George Church      Rock Island, IL      61201-6323">St George Church      Rock Island, IL      61201-6323</option>'+
          '<option value="St George Church      Saint Paul, MN      55105-2648">St George Church      Saint Paul, MN      55105-2648</option>'+
          '<option value="St George Church      Sault Sainte Marie, MI      49783-0842">St George Church      Sault Sainte Marie, MI      49783-0842</option>'+
          '<option value="St George Church      Schenectady, NY      12305">St George Church      Schenectady, NY      12305</option>'+
          '<option value="St George Church      Schererville, IN      46375-2352">St George Church      Schererville, IN      46375-2352</option>'+
          '<option value="St George Church      Shreveport, LA      71101-4725">St George Church      Shreveport, LA      71101-4725</option>'+
          '<option value="St George Church      Southbridge, MA      01550-0025">St George Church      Southbridge, MA      01550-0025</option>'+
          '<option value="St George Church      Southgate, MI      48195-2970">St George Church      Southgate, MI      48195-2970</option>'+
          '<option value="St George Church      Trenton, NJ      08619-3614">St George Church      Trenton, NJ      08619-3614</option>'+
          '<option value="St George Greek Orthodox Church      Bethesda, MD      20817">St George Greek Orthodox Church      Bethesda, MD      20817</option>'+
          '<option value="St Gerasimos Church      New York, NY      10025-4024">St Gerasimos Church      New York, NY      10025-4024</option>'+
          '<option value="St Gregory of Nyssa Church      El Cajon, CA      92019-3752">St Gregory of Nyssa Church      El Cajon, CA      92019-3752</option>'+
          '<option value="St Gregory The Theologian Church      Mansfield, MA      02048-0293">St Gregory The Theologian Church      Mansfield, MA      02048-0293</option>'+
          '<option value="St Haralambos Church      Canton, OH      44709-3923">St Haralambos Church      Canton, OH      44709-3923</option>'+
          '<option value="St Haralambos Church      Peoria, AZ      85383-1674">St Haralambos Church      Peoria, AZ      85383-1674</option>'+
          '<option value="St Iakovos Church      Valparaiso, IN      46385">St Iakovos Church      Valparaiso, IN      46385</option>'+
          '<option value="St John Chrysostom Greek Orthodox Church      Hobe Sound, FL      33475">St John Chrysostom Greek Orthodox Church      Hobe Sound, FL      33475</option>'+
          '<option value="St John Chrysostom Greek Orthodox Mission      Nashville, TN      37209">St John Chrysostom Greek Orthodox Mission      Nashville, TN      37209</option>'+
          '<option value="St John Church      Blue Point, NY      11715-0066">St John Church      Blue Point, NY      11715-0066</option>'+
          '<option value="St John Church      Charleston, WV      25304-1420">St John Church      Charleston, WV      25304-1420</option>'+
          '<option value="St John Church      Sterling Hts, MI      48312-2937">St John Church      Sterling Hts, MI      48312-2937</option>'+
          '<option value="St John Church      Youngstown, OH      44512-1460">St John Church      Youngstown, OH      44512-1460</option>'+
          '<option value="St John of Kronstandt Church      Cleveland, OH      44144-1432">St John of Kronstandt Church      Cleveland, OH      44144-1432</option>'+
          '<option value="St John the Baptist Church      Anaheim, CA      92801-4818">St John the Baptist Church      Anaheim, CA      92801-4818</option>'+
          '<option value="St John The Baptist Church      Boston, MA      02118-2129">St John The Baptist Church      Boston, MA      02118-2129</option>'+
          '<option value="St John the Baptist Church      Cedar Rapids, IA      52401-1015">St John the Baptist Church      Cedar Rapids, IA      52401-1015</option>'+
          '<option value="St John the Baptist Church      Craig, CO      81626-0848">St John the Baptist Church      Craig, CO      81626-0848</option>'+
          '<option value="St John the Baptist Church      Des Plaines, IL      60016-4839">St John the Baptist Church      Des Plaines, IL      60016-4839</option>'+
          '<option value="St John the Baptist Church      Euless, TX      76040-4625">St John the Baptist Church      Euless, TX      76040-4625</option>'+
          '<option value="St John the Baptist Church      Las Vegas, NV      89118-1922">St John the Baptist Church      Las Vegas, NV      89118-1922</option>'+
          '<option value="St John The Baptist Church      Myrtle Beach, SC      29577-5883">St John The Baptist Church      Myrtle Beach, SC      29577-5883</option>'+
          '<option value="St John The Baptist Church      New York, NY      10003-3402">St John The Baptist Church      New York, NY      10003-3402</option>'+
          '<option value="St John the Baptist Church      Omaha, NE      68105-2712">St John the Baptist Church      Omaha, NE      68105-2712</option>'+
          '<option value="St John The Baptist Church      Pueblo, CO      81005-0011">St John The Baptist Church      Pueblo, CO      81005-0011</option>'+
          '<option value="St John the Baptist Church      Salinas, CA      93901-2033">St John the Baptist Church      Salinas, CA      93901-2033</option>'+
          '<option value="St John the Baptist Church      Tampa, FL      33609-4712">St John the Baptist Church      Tampa, FL      33609-4712</option>'+
          '<option value="St John the Baptist Greek Orthodox Church      Beaverton, OR      97006-6041">St John the Baptist Greek Orthodox Church      Beaverton, OR      97006-6041</option>'+
          '<option value="St John the Divine Church      Jacksonville, FL      32207-2033">St John the Divine Church      Jacksonville, FL      32207-2033</option>'+
          '<option value="St John the Divine Church      Wheeling, WV      26003-3842">St John the Divine Church      Wheeling, WV      26003-3842</option>'+
          '<option value="St John the Prodromos Church      Amarillo, TX      79106-4215">St John the Prodromos Church      Amarillo, TX      79106-4215</option>'+
          '<option value="St John the Theologian Cathedral      Tenafly, NJ      07670-2319">St John the Theologian Cathedral      Tenafly, NJ      07670-2319</option>'+
          '<option value="St John The Theologian Church      Panama City, FL      32405-4211">St John The Theologian Church      Panama City, FL      32405-4211</option>'+
          '<option value="St John the Theologian Church      Webster, TX      77598-5125">St John the Theologian Church      Webster, TX      77598-5125</option>'+
          '<option value="St Johns Chapel (Closed)      Destin, FL      32541-7337">St Johns Chapel (Closed)      Destin, FL      32541-7337</option>'+
          '<option value="St Katherine Church      Burlington, NC      27216-1004">St Katherine Church      Burlington, NC      27216-1004</option>'+
          '<option value="St Katherine Church      Chandler, AZ      85224-1806">St Katherine Church      Chandler, AZ      85224-1806</option>'+
          '<option value="St Katherine Church      Falls Church, VA      22041-2430">St Katherine Church      Falls Church, VA      22041-2430</option>'+
          '<option value="St Katherine Church      Naples, FL      34109">St Katherine Church      Naples, FL      34109</option>'+
          '<option value="St Katherine Church      Redondo Beach, CA      90277-4345">St Katherine Church      Redondo Beach, CA      90277-4345</option>'+
          '<option value="St Katherine Greek Orthodox Church      Elk Grove, CA      95758-7420">St Katherine Greek Orthodox Church      Elk Grove, CA      95758-7420</option>'+
          '<option value="St Katherine Greek Orthodox Church      Melbourne, FL      32940-2003">St Katherine Greek Orthodox Church      Melbourne, FL      32940-2003</option>'+
          '<option value="St Katherine-St George Church      Astoria, NY      11105">St Katherine-St George Church      Astoria, NY      11105</option>'+
          '<option value="St Luke Church      Broomall, PA      19008-1932">St Luke Church      Broomall, PA      19008-1932</option>'+
          '<option value="St Luke Church      East Longmeadow, MA      01028-0381">St Luke Church      East Longmeadow, MA      01028-0381</option>'+
          '<option value="St Luke Greek Orthodox Church      Mooresville, NC      28115-1513">St Luke Greek Orthodox Church      Mooresville, NC      28115-1513</option>'+
          '<option value="St Luke the Evangelist Church      Columbia, MO      65201-6277">St Luke the Evangelist Church      Columbia, MO      65201-6277</option>'+
          '<option value="St Mark Church      Belleview, FL      34420">St Mark Church      Belleview, FL      34420</option>'+
          '<option value="St Mark Church      Boca Raton, FL      33431-4323">St Mark Church      Boca Raton, FL      33431-4323</option>'+
          '<option value="St Markella Church      Wantagh, NY      11793-3352">St Markella Church      Wantagh, NY      11793-3352</option>'+
          '<option value="St Mary Church      Johnstown, PA      15901-2529">St Mary Church      Johnstown, PA      15901-2529</option>'+
          '<option value="St Mary Church      Minneapolis, MN      55408-3334">St Mary Church      Minneapolis, MN      55408-3334</option>'+
          '<option value="St Matthew Church      Blandon, PA      19510-9451">St Matthew Church      Blandon, PA      19510-9451</option>'+
          '<option value="St Nectarios Church      Covina, CA      91722-8459">St Nectarios Church      Covina, CA      91722-8459</option>'+
          '<option value="St Nectarios Church      Palatine, IL      60067-5855">St Nectarios Church      Palatine, IL      60067-5855</option>'+
          '<option value="St Nectarios Church      Roslindale, MA      02131-3025">St Nectarios Church      Roslindale, MA      02131-3025</option>'+
          '<option value="St Nectarios Mission      Pasco, WA      99301-5432">St Nectarios Mission      Pasco, WA      99301-5432</option>'+
          '<option value="St Nektarios Church      Charlotte, NC      28270-0269">St Nektarios Church      Charlotte, NC      28270-0269</option>'+
          '<option value="St Nicholas Albanian Church      Chicago, IL      60639-1031">St Nicholas Albanian Church      Chicago, IL      60639-1031</option>'+
          '<option value="St Nicholas Cathedral      Pittsburgh, PA      15213-3509">St Nicholas Cathedral      Pittsburgh, PA      15213-3509</option>'+
          '<option value="St Nicholas Cathedral      Tarpon Springs, FL      34689-3449">St Nicholas Cathedral      Tarpon Springs, FL      34689-3449</option>'+
          '<option value="St Nicholas Church      Ann Arbor, MI      48103-9634">St Nicholas Church      Ann Arbor, MI      48103-9634</option>'+
          '<option value="St Nicholas Church      Appleton, WI">St Nicholas Church      Appleton, WI</option>'+
          '<option value="St Nicholas Church      Atlantic City, NJ      08404-0641">St Nicholas Church      Atlantic City, NJ      08404-0641</option>'+
          '<option value="St Nicholas Church      Baltimore, MD      21224">St Nicholas Church      Baltimore, MD      21224</option>'+
          '<option value="St Nicholas Church      Bethlehem, PA      18018-3416">St Nicholas Church      Bethlehem, PA      18018-3416</option>'+
          '<option value="St Nicholas Church      Clinton, MA      01510-0098">St Nicholas Church      Clinton, MA      01510-0098</option>'+
          '<option value="St Nicholas Church      Corpus Christi, TX      78403-0343">St Nicholas Church      Corpus Christi, TX      78403-0343</option>'+
          '<option value="St Nicholas Church      El Paso, TX      79912-5802">St Nicholas Church      El Paso, TX      79912-5802</option>'+
          '<option value="St Nicholas Church      Enfield, CT      06083-1155">St Nicholas Church      Enfield, CT      06083-1155</option>'+
          '<option value="St Nicholas Church      Fort Pierce, FL      34981-5644">St Nicholas Church      Fort Pierce, FL      34981-5644</option>'+
          '<option value="St Nicholas Church      Grand Jct, CO      81506-5437">St Nicholas Church      Grand Jct, CO      81506-5437</option>'+
          '<option value="St Nicholas Church      Jamestown, NY      14702-0264">St Nicholas Church      Jamestown, NY      14702-0264</option>'+
          '<option value="St Nicholas Church      Lexington, MA      02420-5308">St Nicholas Church      Lexington, MA      02420-5308</option>'+
          '<option value="St Nicholas Church      Lorain, OH      44053-3034">St Nicholas Church      Lorain, OH      44053-3034</option>'+
          '<option value="St Nicholas Church      Manchester, NH      03104-5741">St Nicholas Church      Manchester, NH      03104-5741</option>'+
          '<option value="St Nicholas Church      Newburgh, NY      12550-0204">St Nicholas Church      Newburgh, NY      12550-0204</option>'+
          '<option value="St Nicholas Church      Northridge, CA      91325-1901">St Nicholas Church      Northridge, CA      91325-1901</option>'+
          '<option value="St Nicholas Church      Oak Lawn, IL      60453-4845">St Nicholas Church      Oak Lawn, IL      60453-4845</option>'+
          '<option value="St Nicholas Church      Portsmouth, NH      03801-5448">St Nicholas Church      Portsmouth, NH      03801-5448</option>'+
          '<option value="St Nicholas Church      Rutland, VT      05702-0939">St Nicholas Church      Rutland, VT      05702-0939</option>'+
          '<option value="St Nicholas Church      Saint Louis, MO      63108-1401">St Nicholas Church      Saint Louis, MO      63108-1401</option>'+
          '<option value="St Nicholas Church      San Jose, CA      95126-1402">St Nicholas Church      San Jose, CA      95126-1402</option>'+
          '<option value="St Nicholas Church      Spartanburg, SC      29304-1107">St Nicholas Church      Spartanburg, SC      29304-1107</option>'+
          '<option value="St Nicholas Church      Tacoma, WA      98405-4460">St Nicholas Church      Tacoma, WA      98405-4460</option>'+
          '<option value="St Nicholas Church      Temecula, CA      92590-3404">St Nicholas Church      Temecula, CA      92590-3404</option>'+
          '<option value="St Nicholas Church      Troy, MI      48098-4500">St Nicholas Church      Troy, MI      48098-4500</option>'+
          '<option value="St Nicholas Church      Virginia Beach, VA      23451-6121">St Nicholas Church      Virginia Beach, VA      23451-6121</option>'+
          '<option value="St Nicholas Church      Waco, TX      76707-3522">St Nicholas Church      Waco, TX      76707-3522</option>'+
          '<option value="St Nicholas Church      West Babylon, NY      11704-7821">St Nicholas Church      West Babylon, NY      11704-7821</option>'+
          '<option value="St Nicholas Church      Wilmington, NC      28403-3202">St Nicholas Church      Wilmington, NC      28403-3202</option>'+
          '<option value="St Nicholas Church      Wyckoff, NJ      07481-2543">St Nicholas Church      Wyckoff, NJ      07481-2543</option>'+
          '<option value="St Nicholas Church      Youngstown, OH      44503-1623">St Nicholas Church      Youngstown, OH      44503-1623</option>'+
          '<option value="St Nicholas Church (was located inWorld Trade Ctr)      Brooklyn, NY      11234">St Nicholas Church (was located inWorld Trade Ctr)      Brooklyn, NY      11234</option>'+
          '<option value="St Nicholas Shrine Church      Flushing, NY      11358-3037">St Nicholas Shrine Church      Flushing, NY      11358-3037</option>'+
          '<option value="St Panteleimon Chapel      Lexington, MI      48450-8913">St Panteleimon Chapel      Lexington, MI      48450-8913</option>'+
          '<option value="St Paraskevi Shrine Church      Greenlawn, NY      11740-1512">St Paraskevi Shrine Church      Greenlawn, NY      11740-1512</option>'+
          '<option value="St Paul Cathedral      Hempstead, NY      11550-2050">St Paul Cathedral      Hempstead, NY      11550-2050</option>'+
          '<option value="St Paul Church      Irvine, CA      92604-8606">St Paul Church      Irvine, CA      92604-8606</option>'+
          '<option value="St Paul Church      North Royalton, OH      44133-3121">St Paul Church      North Royalton, OH      44133-3121</option>'+
          '<option value="St Paul Church      Savannah, GA      31401-6738">St Paul Church      Savannah, GA      31401-6738</option>'+
          '<option value="St Peter Church      Danville, VA      24543-3392">St Peter Church      Danville, VA      24543-3392</option>'+
          '<option value="St Peter the Apostle Church      Bronx, NY      10463-5514">St Peter the Apostle Church      Bronx, NY      10463-5514</option>'+
          '<option value="St Philip Church      Nashua, NH      03062-1314">St Philip Church      Nashua, NH      03062-1314</option>'+
          '<option value="St Philothea Church      Watkinsville, GA      30677-1580">St Philothea Church      Watkinsville, GA      30677-1580</option>'+
          '<option value="St Photios Nathional Shrine      St Augustine, FL      32085-1960">St Photios Nathional Shrine      St Augustine, FL      32085-1960</option>'+
          '<option value="St Sophia Cathedral      Los Angeles, CA      90006-4310">St Sophia Cathedral      Los Angeles, CA      90006-4310</option>'+
          '<option value="St Sophia Cathedral      Miami, FL      33129-2023">St Sophia Cathedral      Miami, FL      33129-2023</option>'+
          '<option value="St Sophia Cathedral      Washington, DC      20007-1424">St Sophia Cathedral      Washington, DC      20007-1424</option>'+
          '<option value="St Sophia Church      Albany, NY      12208-1643">St Sophia Church      Albany, NY      12208-1643</option>'+
          '<option value="St Sophia Church      Bellingham, WA      98225">St Sophia Church      Bellingham, WA      98225</option>'+
          '<option value="St Sophia Church      Elgin, IL      60123-9307">St Sophia Church      Elgin, IL      60123-9307</option>'+
          '<option value="St Sophia Church      New London, CT      06320-6205">St Sophia Church      New London, CT      06320-6205</option>'+
          '<option value="St Sophia Church      San Antonio, TX      78212-3738">St Sophia Church      San Antonio, TX      78212-3738</option>'+
          '<option value="St Sophia Church      Syracuse , NY      13224-2254">St Sophia Church      Syracuse , NY      13224-2254</option>'+
          '<option value="St Sophia Greek Orthodox Church      Winter Haven, FL      33883-7424">St Sophia Greek Orthodox Church      Winter Haven, FL      33883-7424</option>'+
          '<option value="St Sophia Ss Faith Hope &amp; Agape Church      Jeffersonville, PA      19403-5212">St Sophia Ss Faith Hope &amp; Agape Church      Jeffersonville, PA      19403-5212</option>'+
          '<option value="St Spyridon Cathedral      Worcester, MA      01609-1908">St Spyridon Cathedral      Worcester, MA      01609-1908</option>'+
          '<option value="St Spyridon Chapel      Troy, MI      48084-4703">St Spyridon Chapel      Troy, MI      48084-4703</option>'+
          '<option value="St Spyridon Church      Clarksburg, WV      26302-4176">St Spyridon Church      Clarksburg, WV      26302-4176</option>'+
          '<option value="St Spyridon Church      Monessen, PA      15062-1933">St Spyridon Church      Monessen, PA      15062-1933</option>'+
          '<option value="St Spyridon Church      New York, NY      10033-4812">St Spyridon Church      New York, NY      10033-4812</option>'+
          '<option value="St Spyridon Church      Newport, RI      02840-0400">St Spyridon Church      Newport, RI      02840-0400</option>'+
          '<option value="St Spyridon Church      Palos Heights, IL      60463-1855">St Spyridon Church      Palos Heights, IL      60463-1855</option>'+
          '<option value="St Spyridon Church      San Diego, CA      92103-4546">St Spyridon Church      San Diego, CA      92103-4546</option>'+
          '<option value="St Spyridon Church      Sheboygan, WI      53081-5337">St Spyridon Church      Sheboygan, WI      53081-5337</option>'+
          '<option value="St Spyridon Church      Upland, CA      91785-1327">St Spyridon Church      Upland, CA      91785-1327</option>'+
          '<option value="St Spyridon Greek Orthodox Church      Loveland, CO      80538-2659">St Spyridon Greek Orthodox Church      Loveland, CO      80538-2659</option>'+
          '<option value="St Stefanos Church      St Petersburg, FL      33710-1262">St Stefanos Church      St Petersburg, FL      33710-1262</option>'+
          '<option value="St Theodore Church      Lanham, MD      20706-3808">St Theodore Church      Lanham, MD      20706-3808</option>'+
          '<option value="St Thomas Church      Cherry Hill, NJ      08002-2635">St Thomas Church      Cherry Hill, NJ      08002-2635</option>'+
          '<option value="St Vasilios Church      Newport, NH      03773-0428">St Vasilios Church      Newport, NH      03773-0428</option>'+
          '<option value="St Vasilios Church      Peabody, MA      01960-4496">St Vasilios Church      Peabody, MA      01960-4496</option>'+
          '<option value="St Vasilios Church      Watertown, NY      13601-3406">St Vasilios Church      Watertown, NY      13601-3406</option>'+
          '<option value="Sts. Anargyroi Church      Marlborough, MA      01752-0381">Sts. Anargyroi Church      Marlborough, MA      01752-0381</option>'+
          '<option value="Sts. Anargyroi Church      New York, NY      10040-4505">Sts. Anargyroi Church      New York, NY      10040-4505</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Brooklyn, NY      11201-5005">Sts. Constantine &amp; Helen Cathedral      Brooklyn, NY      11201-5005</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Cleveland, OH      44118-1330">Sts. Constantine &amp; Helen Cathedral      Cleveland, OH      44118-1330</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Honolulu, HI      96822-3562">Sts. Constantine &amp; Helen Cathedral      Honolulu, HI      96822-3562</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Merrillville, IN      46410-5404">Sts. Constantine &amp; Helen Cathedral      Merrillville, IN      46410-5404</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Richmond, VA      23221-2658">Sts. Constantine &amp; Helen Cathedral      Richmond, VA      23221-2658</option>'+
          '<option value="Sts. Constantine &amp; Helen Chapel      Battle Creek, MI      49016-0189">Sts. Constantine &amp; Helen Chapel      Battle Creek, MI      49016-0189</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Andover, MA      01810-1232">Sts. Constantine &amp; Helen Church      Andover, MA      01810-1232</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Annapolis, MD      21401-7202">Sts. Constantine &amp; Helen Church      Annapolis, MD      21401-7202</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Boise, ID      83702-4705">Sts. Constantine &amp; Helen Church      Boise, ID      83702-4705</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cambridge, MA      02139-3965">Sts. Constantine &amp; Helen Church      Cambridge, MA      02139-3965</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cardiff-By-The-Sea, CA      92007-1525">Sts. Constantine &amp; Helen Church      Cardiff-By-The-Sea, CA      92007-1525</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cheyenne, WY      82003-0112">Sts. Constantine &amp; Helen Church      Cheyenne, WY      82003-0112</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Chicopee, MA      01021-0112">Sts. Constantine &amp; Helen Church      Chicopee, MA      01021-0112</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Fayetteville, NC      28305-4626">Sts. Constantine &amp; Helen Church      Fayetteville, NC      28305-4626</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Great Falls, MT      59403-2564">Sts. Constantine &amp; Helen Church      Great Falls, MT      59403-2564</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Jackson Hts, NY      11372-6144">Sts. Constantine &amp; Helen Church      Jackson Hts, NY      11372-6144</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Lancaster, CA      93536-5319">Sts. Constantine &amp; Helen Church      Lancaster, CA      93536-5319</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Mansfield, OH      44903-7200">Sts. Constantine &amp; Helen Church      Mansfield, OH      44903-7200</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Middletown, OH      45044-4712">Sts. Constantine &amp; Helen Church      Middletown, OH      45044-4712</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Monroe, LA      71201-3608">Sts. Constantine &amp; Helen Church      Monroe, LA      71201-3608</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Newport News, VA      23606-3507">Sts. Constantine &amp; Helen Church      Newport News, VA      23606-3507</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Palos Hills, IL      60465-2398">Sts. Constantine &amp; Helen Church      Palos Hills, IL      60465-2398</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Reading, PA      19611-1763">Sts. Constantine &amp; Helen Church      Reading, PA      19611-1763</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Rockford, IL      61107-4039">Sts. Constantine &amp; Helen Church      Rockford, IL      61107-4039</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Swansea, IL      62226-1094">Sts. Constantine &amp; Helen Church      Swansea, IL      62226-1094</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Vallejo, CA      94590-4648">Sts. Constantine &amp; Helen Church      Vallejo, CA      94590-4648</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Vandergrift, PA      15690-1209">Sts. Constantine &amp; Helen Church      Vandergrift, PA      15690-1209</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Webster, MA      01570-0713">Sts. Constantine &amp; Helen Church      Webster, MA      01570-0713</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      West Nyack, NY      10994-2426">Sts. Constantine &amp; Helen Church      West Nyack, NY      10994-2426</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Westland, MI      48185-0032">Sts. Constantine &amp; Helen Church      Westland, MI      48185-0032</option>'+
          '<option value="Sts. Constantine &amp; Helen of Washington Dc      Silver Spring, MD      20905-3801">Sts. Constantine &amp; Helen of Washington Dc      Silver Spring, MD      20905-3801</option>'+
          '<option value="Sts. Constantine and Helen Church      Wauwatosa, WI      53213-1743">Sts. Constantine and Helen Church      Wauwatosa, WI      53213-1743</option>'+
          '<option value="Sts. Markella &amp; Demetrios Church      Ft Walton Beach, FL      32549-2135">Sts. Markella &amp; Demetrios Church      Ft Walton Beach, FL      32549-2135</option>'+
          '<option value="Sts. Markella &amp; Demetrios Church      Mary Esther, FL      32569">Sts. Markella &amp; Demetrios Church      Mary Esther, FL      32569</option>'+
          '<option value="Sts. Mary Magdalene &amp; Markella Church      Bel Air, MD      21014-7575">Sts. Mary Magdalene &amp; Markella Church      Bel Air, MD      21014-7575</option>'+
          '<option value="Sts. Nicholas Constantine &amp; Helen Church      Roseland, NJ      07068">Sts. Nicholas Constantine &amp; Helen Church      Roseland, NJ      07068</option>'+
          '<option value="Sts. Peter &amp; Paul Church      Boulder, CO      80301-3042">Sts. Peter &amp; Paul Church      Boulder, CO      80301-3042</option>'+
          '<option value="Sts. Peter &amp; Paul Church      Glenview, IL      60025-2305">Sts. Peter &amp; Paul Church      Glenview, IL      60025-2305</option>'+
          '<option value="Sts. Peter and Paul Church      Frederick, MD      21701-8518">Sts. Peter and Paul Church      Frederick, MD      21701-8518</option>'+
          '<option value="Sts. Raphael Nicholas &amp; Irene Mission      Palm Harbor, FL      34683-4919">Sts. Raphael Nicholas &amp; Irene Mission      Palm Harbor, FL      34683-4919</option>'+
          '<option value="Sts. Raphael Nicholas and Irene Church      Cumming, GA      30028-0588">Sts. Raphael Nicholas and Irene Church      Cumming, GA      30028-0588</option>'+
          '<option value="Sts. Theodoroi Church      Gloversville, NY      12078-0009">Sts. Theodoroi Church      Gloversville, NY      12078-0009</option>'+
          '<option value="Taxiarchae Archangels Church      Watertown, MA      02472">Taxiarchae Archangels Church      Watertown, MA      02472</option>'+
          '<option value="Taxiarchai Church      Laconia, NH      03247-0086">Taxiarchai Church      Laconia, NH      03247-0086</option>'+
          '<option value="The Archangel Michael Church      Port Washington, NY      11050-4613">The Archangel Michael Church      Port Washington, NY      11050-4613</option>'+
          '<option value="The Twelve Holy Apostles Church      Duluth, MN      55805-2010">The Twelve Holy Apostles Church      Duluth, MN      55805-2010</option>'+
          '<option value="Three Hierarchs Church      Brooklyn, NY      11229-1206">Three Hierarchs Church      Brooklyn, NY      11229-1206</option>'+
          '<option value="Three Hierarchs Church      Champaign, IL      61820-7232">Three Hierarchs Church      Champaign, IL      61820-7232</option>'+
          '<option value="Transfiguration Church      Austin, TX      78746-3101">Transfiguration Church      Austin, TX      78746-3101</option>'+
          '<option value="Transfiguration Church      Charlottesville, VA      22902-4340">Transfiguration Church      Charlottesville, VA      22902-4340</option>'+
          '<option value="Transfiguration Church      Florence, SC      29501-6327">Transfiguration Church      Florence, SC      29501-6327</option>'+
          '<option value="Transfiguration Church      Franklin, NH      03235-1213">Transfiguration Church      Franklin, NH      03235-1213</option>'+
          '<option value="Transfiguration Church      Ogden, UT      84403-2851">Transfiguration Church      Ogden, UT      84403-2851</option>'+
          '<option value="Transfiguration of Christ Church      Corona, NY      11368">Transfiguration of Christ Church      Corona, NY      11368</option>'+
          '<option value="Transfiguration Of Christ Church      Mattituck, NY      11952-0921">Transfiguration Of Christ Church      Mattituck, NY      11952-0921</option>'+
          '<option value="Transfiguration of our Lord Church      Mason City, IA      50401-1700">Transfiguration of our Lord Church      Mason City, IA      50401-1700</option>'+
          '<option value="Transfiguration of Our Saviour Church      Lowell, MA      01854-3501">Transfiguration of Our Saviour Church      Lowell, MA      01854-3501</option>'+
          '<option value="Zoodochos Peghe Church      Bronx, NY      10461-4605">Zoodochos Peghe Church      Bronx, NY      10461-4605</option>'+
          '<option value="Zoodochos Peghe Church      Hot Springs, AR      71901-6827">Zoodochos Peghe Church      Hot Springs, AR      71901-6827</option>'+
          '<option value="Zoodochos Peghe Church      Martins Ferry, OH      43935-1647">Zoodochos Peghe Church      Martins Ferry, OH      43935-1647</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr63 = document.createElement('tr');
        tr63.setAttribute('name', 'tr63'+memNum);
        tr63.setAttribute('id', 'tr63'+memNum);
        mainTableBody.appendChild(tr63);
        var td63 = document.createElement('td');
        td63.setAttribute('id', 'td63'+memNum);
        tr63.appendChild(td63);
        td63.innerHTML = '<span class="lbl">&nbsp;&nbsp;&nbsp;Marriage</span><input type="hidden" name="txaMem'+memNum+'Sac3Name" id="txaMem'+memNum+'Sac3Name" value="Marriage" />';
        var td64 = document.createElement('td');
        td64.setAttribute('id', 'td64'+memNum);
        td64.setAttribute('colspan', '1');
        tr63.appendChild(td64);
        td64.innerHTML = ' <select tabindex="167" name="cboMember'+memNum+'Sac3" id="cboMember'+memNum+'Sac3" class="pulldownstyle"><option value="" /><option value="Yes">Yes</option><option value="No">No</option></select>';
        var td65 = document.createElement('td');
        td65.setAttribute('id', 'td65'+memNum);
        td65.setAttribute('colspan', '1');
        tr63.appendChild(td65);
        td65.innerHTML = '<span class="lbl">Date </span><input tabindex="'+(formTabIndex+1)+'" style="width:100px" autocomplete="off" value="mm/dd/yyyy" title="enter the marriage date" name="dteMem'+memNum+'Sac3Date" id="dteMem'+memNum+'Sac3Date" onkeydown="onKeyPressed(event, this);" onFocus="this.select()" class="textboxstyle" />';
        calendar.set('dteMem'+memNum+'Sac3Date');
        formTabIndex = formTabIndex + 1;
        var td66 = document.createElement('td');
        td66.setAttribute('id', 'td66'+memNum);
        td66.setAttribute('colspan', '2');
        tr63.appendChild(td66);
        td66.innerHTML = 
          '<span class="lbl">Place </span><select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Sac3Place" id="cboMem'+memNum+'Sac3Place" title="Select a place in the pull down list" style="width: 166px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="All Holy Spirit Church      Omaha, NE      68127-3549">All Holy Spirit Church      Omaha, NE      68127-3549</option>'+
          '<option value="All St s Church      Canonsburg, PA      15317-2437">All St s Church      Canonsburg, PA      15317-2437</option>'+
          '<option value="All St s Church      Joliet, IL      60435-7498">All St s Church      Joliet, IL      60435-7498</option>'+
          '<option value="All St s Church      Peoria, IL      61603-3329">All St s Church      Peoria, IL      61603-3329</option>'+
          '<option value="All St s Church      Weirton, WV      26062-0128">All St s Church      Weirton, WV      26062-0128</option>'+
          '<option value="Annunciation &amp; Agia Paraskevi Church      New Buffalo, MI      49117-0093">Annunciation &amp; Agia Paraskevi Church      New Buffalo, MI      49117-0093</option>'+
          '<option value="Annunciation Cathedral      Atlanta, GA      30329-2709">Annunciation Cathedral      Atlanta, GA      30329-2709</option>'+
          '<option value="Annunciation Cathedral      Baltimore, MD      21201-5700">Annunciation Cathedral      Baltimore, MD      21201-5700</option>'+
          '<option value="Annunciation Cathedral      Brookline, MA      02445-7414">Annunciation Cathedral      Brookline, MA      02445-7414</option>'+
          '<option value="Annunciation Cathedral      Chicago, IL      60610-2699">Annunciation Cathedral      Chicago, IL      60610-2699</option>'+
          '<option value="Annunciation Cathedral      Columbus, OH      43215-2068">Annunciation Cathedral      Columbus, OH      43215-2068</option>'+
          '<option value="Annunciation Cathedral      Detroit, MI      48226-2990">Annunciation Cathedral      Detroit, MI      48226-2990</option>'+
          '<option value="Annunciation Cathedral      Housto, TX      77006-4326">Annunciation Cathedral      Housto, TX      77006-4326</option>'+
          '<option value="Annunciation Cathedral      Norfolk, VA      23505-4002">Annunciation Cathedral      Norfolk, VA      23505-4002</option>'+
          '<option value="Annunciation Cathedral      San Francisco, CA      94103-2320">Annunciation Cathedral      San Francisco, CA      94103-2320</option>'+
          '<option value="Annunciation Church      Akron, OH      44304-1518">Annunciation Church      Akron, OH      44304-1518</option>'+
          '<option value="Annunciation Church      Brockton, MA      02301-1340">Annunciation Church      Brockton, MA      02301-1340</option>'+
          '<option value="Annunciation Church      Buffalo, NY      14222-2018">Annunciation Church      Buffalo, NY      14222-2018</option>'+
          '<option value="Annunciation Church      Chattanooga, TN      37404-1104">Annunciation Church      Chattanooga, TN      37404-1104</option>'+
          '<option value="Annunciation Church      Cleveland, OH      44113-3609">Annunciation Church      Cleveland, OH      44113-3609</option>'+
          '<option value="Annunciation Church      Cranston, RI      02920-9320">Annunciation Church      Cranston, RI      02920-9320</option>'+
          '<option value="Annunciation Church      Dayton, OH      45405-4705">Annunciation Church      Dayton, OH      45405-4705</option>'+
          '<option value="Annunciation Church      Decatur, IL      62522-2126">Annunciation Church      Decatur, IL      62522-2126</option>'+
          '<option value="Annunciation Church      Dover, NH      03820-3753">Annunciation Church      Dover, NH      03820-3753</option>'+
          '<option value="Annunciation Church      Elkins Park, PA      19027-2306">Annunciation Church      Elkins Park, PA      19027-2306</option>'+
          '<option value="Annunciation Church      Fort Myers, FL      33919-5116">Annunciation Church      Fort Myers, FL      33919-5116</option>'+
          '<option value="Annunciation Church      Kalamazoo, MI      49007-5053">Annunciation Church      Kalamazoo, MI      49007-5053</option>'+
          '<option value="Annunciation Church      Kankakee, IL      60901-3761">Annunciation Church      Kankakee, IL      60901-3761</option>'+
          '<option value="Annunciation Church      Kansas City, MO      64145-1116">Annunciation Church      Kansas City, MO      64145-1116</option>'+
          '<option value="Annunciation Church      Lancaster, PA      17603-5498">Annunciation Church      Lancaster, PA      17603-5498</option>'+
          '<option value="Annunciation Church      Lincoln, NE      68505-2286">Annunciation Church      Lincoln, NE      68505-2286</option>'+
          '<option value="Annunciation Church      Little Rock, AR      72211-2312">Annunciation Church      Little Rock, AR      72211-2312</option>'+
          '<option value="Annunciation Church      Memphis, TN      38122-5107">Annunciation Church      Memphis, TN      38122-5107</option>'+
          '<option value="Annunciation Church      Milwaukee, WI      53225-4812">Annunciation Church      Milwaukee, WI      53225-4812</option>'+
          '<option value="Annunciation Church      Missoula, MT      59801-3936">Annunciation Church      Missoula, MT      59801-3936</option>'+
          '<option value="Annunciation Church      Mobile, AL      36604-2131">Annunciation Church      Mobile, AL      36604-2131</option>'+
          '<option value="Annunciation Church      Modesto, CA      95357-8128">Annunciation Church      Modesto, CA      95357-8128</option>'+
          '<option value="Annunciation Church      Montgomery, AL      36107-2207">Annunciation Church      Montgomery, AL      36107-2207</option>'+
          '<option value="Annunciation Church      Muskegon, MI      49444-9744">Annunciation Church      Muskegon, MI      49444-9744</option>'+
          '<option value="Annunciation Church      New York, NY      10024-1011">Annunciation Church      New York, NY      10024-1011</option>'+
          '<option value="Annunciation Church      Newburyport, MA      01950-0775">Annunciation Church      Newburyport, MA      01950-0775</option>'+
          '<option value="Annunciation Church      North Miami, FL      33168-4529">Annunciation Church      North Miami, FL      33168-4529</option>'+
          '<option value="Annunciation Church      Pensacola, FL      32501">Annunciation Church      Pensacola, FL      32501</option>'+
          '<option value="Annunciation Church      Sacramento, CA      95816-3810">Annunciation Church      Sacramento, CA      95816-3810</option>'+
          '<option value="Annunciation Church      Scranton, PA      18501-0021">Annunciation Church      Scranton, PA      18501-0021</option>'+
          '<option value="Annunciation Church      Stamford, CT      06905-1495">Annunciation Church      Stamford, CT      06905-1495</option>'+
          '<option value="Annunciation Church      Vestal, NY      13850-3543">Annunciation Church      Vestal, NY      13850-3543</option>'+
          '<option value="Annunciation Church      Wilkes Barre, PA      18701-2304">Annunciation Church      Wilkes Barre, PA      18701-2304</option>'+
          '<option value="Annunciation Church      Winston Salem, NC      27104-3907">Annunciation Church      Winston Salem, NC      27104-3907</option>'+
          '<option value="Annunciation Church      Woburn, MA      01801-4254">Annunciation Church      Woburn, MA      01801-4254</option>'+
          '<option value="Annunciation Church      York, PA      17403-5132">Annunciation Church      York, PA      17403-5132</option>'+
          '<option value="Annunciation Greek Orthodox Church      Ft Lauderdale, FL      33309">Annunciation Greek Orthodox Church      Ft Lauderdale, FL      33309</option>'+
          '<option value="Annunciation Greek Orthodox Church      Rochester, NY      14607">Annunciation Greek Orthodox Church      Rochester, NY      14607</option>'+
          '<option value="Annunciation of the Theotokos Church      McKeesport, PA      15131-1556">Annunciation of the Theotokos Church      McKeesport, PA      15131-1556</option>'+
          '<option value="Annunciation of the Virgin Mary Church      New Kensington, PA      15068-0526">Annunciation of the Virgin Mary Church      New Kensington, PA      15068-0526</option>'+
          '<option value="Archangel Gabriel Orthodox Church      Traverse City, MI      49696-6350">Archangel Gabriel Orthodox Church      Traverse City, MI      49696-6350</option>'+
          '<option value="Archangel Michael Chapel      Atlanta, GA      30329-3377">Archangel Michael Chapel      Atlanta, GA      30329-3377</option>'+
          '<option value="Archangel Michael Church      Campbell, OH      44405-1454">Archangel Michael Church      Campbell, OH      44405-1454</option>'+
          '<option value="Archangel Michael Church      Colorado Springs, CO      80907-7165">Archangel Michael Church      Colorado Springs, CO      80907-7165</option>'+
          '<option value="Archangel Michael Church      Iverness, FL      34451-0241">Archangel Michael Church      Iverness, FL      34451-0241</option>'+
          '<option value="Archangels Church      Stamford, CT      06905-4713">Archangels Church      Stamford, CT      06905-4713</option>'+
          '<option value="Ascension Cathedral      Oakland, CA      94602-2535">Ascension Cathedral      Oakland, CA      94602-2535</option>'+
          '<option value="Ascension Church      Fairview, NJ      07022-2003">Ascension Church      Fairview, NJ      07022-2003</option>'+
          '<option value="Ascension of Our Lord Church      Lincolnshire, IL      60069-2403">Ascension of Our Lord Church      Lincolnshire, IL      60069-2403</option>'+
          '<option value="Assumption Cathedral      Denver, CO      80246-1301">Assumption Cathedral      Denver, CO      80246-1301</option>'+
          '<option value="Assumption Church      Bayard, NE      69334-0550">Assumption Church      Bayard, NE      69334-0550</option>'+
          '<option value="Assumption Church      Chicago, IL      60644-5089">Assumption Church      Chicago, IL      60644-5089</option>'+
          '<option value="Assumption Church      Danbury, CT      06811-4542">Assumption Church      Danbury, CT      06811-4542</option>'+
          '<option value="Assumption Church      East Moline, IL      61244-4256">Assumption Church      East Moline, IL      61244-4256</option>'+
          '<option value="Assumption Church      Galveston, TX      77553-0655">Assumption Church      Galveston, TX      77553-0655</option>'+
          '<option value="Assumption Church      Grand Blanc, MI      48439-8311">Assumption Church      Grand Blanc, MI      48439-8311</option>'+
          '<option value="Assumption Church      Hegewisch, IL      60633-1847">Assumption Church      Hegewisch, IL      60633-1847</option>'+
          '<option value="Assumption Church      Homer Glen, IL      60491">Assumption Church      Homer Glen, IL      60491</option>'+
          '<option value="Assumption Church      Ipswich, MA      01938-0006">Assumption Church      Ipswich, MA      01938-0006</option>'+
          '<option value="Assumption Church      Louisville, KY      40242-4536">Assumption Church      Louisville, KY      40242-4536</option>'+
          '<option value="Assumption Church      Madison, WI      53704-4904">Assumption Church      Madison, WI      53704-4904</option>'+
          '<option value="Assumption Church      Manchester, NH      03109">Assumption Church      Manchester, NH      03109</option>'+
          '<option value="Assumption Church      Marquette, MI      49855-4339">Assumption Church      Marquette, MI      49855-4339</option>'+
          '<option value="Assumption Church      Morgantown, WV      26505-5525">Assumption Church      Morgantown, WV      26505-5525</option>'+
          '<option value="Assumption Church      Pawtucket, RI      02860-3205">Assumption Church      Pawtucket, RI      02860-3205</option>'+
          '<option value="Assumption Church      Pocatello, ID      83205-4567">Assumption Church      Pocatello, ID      83205-4567</option>'+
          '<option value="Assumption Church      Port Jefferson, NY      11777-2074">Assumption Church      Port Jefferson, NY      11777-2074</option>'+
          '<option value="Assumption Church      Price, UT      84501-0688">Assumption Church      Price, UT      84501-0688</option>'+
          '<option value="Assumption Church      San Angelo, TX      76903-7224">Assumption Church      San Angelo, TX      76903-7224</option>'+
          '<option value="Assumption Church      Scottsdale, AZ      85260-5211">Assumption Church      Scottsdale, AZ      85260-5211</option>'+
          '<option value="Assumption Church      Seattle, WA      98122-2515">Assumption Church      Seattle, WA      98122-2515</option>'+
          '<option value="Assumption Church      Somersworth, NH      03878-0110">Assumption Church      Somersworth, NH      03878-0110</option>'+
          '<option value="Assumption Church      St Clair Shores, MI      48080-2464">Assumption Church      St Clair Shores, MI      48080-2464</option>'+
          '<option value="Assumption Church      Town & Country, MO      63131-1405">Assumption Church      Town & Country, MO      63131-1405</option>'+
          '<option value="Assumption Church      Windham, NY      12496">Assumption Church      Windham, NY      12496</option>'+
          '<option value="Assumption Church of the Blessed Virgin      Springfield, OH      45505-1192">Assumption Church of the Blessed Virgin      Springfield, OH      45505-1192</option>'+
          '<option value="Assumption of the Blessed Virgin Mary Church      Long Beach, CA      90814-1900">Assumption of the Blessed Virgin Mary Church      Long Beach, CA      90814-1900</option>'+
          '<option value="Assumption of the Virgin Mary Church      Dracut, MA      01826-3147">Assumption of the Virgin Mary Church      Dracut, MA      01826-3147</option>'+
          '<option value="Christ the Savior Orthodox Mission      Spring Hill, FL      34604-0116">Christ the Savior Orthodox Mission      Spring Hill, FL      34604-0116</option>'+
          '<option value="Church of Our Saviour      Rye, NY      10580-1981">Church of Our Saviour      Rye, NY      10580-1981</option>'+
          '<option value="Church of the Holy Resurrection      Brookville, NY      11545-2124">Church of the Holy Resurrection      Brookville, NY      11545-2124</option>'+
          '<option value="Church of the Resurrection      Castro Valley, CA      94546-4712">Church of the Resurrection      Castro Valley, CA      94546-4712</option>'+
          '<option value="Dormition of The Mother Of God Church      Burlington, VT      05402-8122">Dormition of The Mother Of God Church      Burlington, VT      05402-8122</option>'+
          '<option value="Dormition of the Theotokos Church      Greensboro, NC      27410-4504">Dormition of the Theotokos Church      Greensboro, NC      27410-4504</option>'+
          '<option value="Dormition of the Theotokos Church      Oakmont, PA      15139-2114">Dormition of the Theotokos Church      Oakmont, PA      15139-2114</option>'+
          '<option value="Dormition of the Virgin Mary Church      Somerville, MA      02143-2841">Dormition of the Virgin Mary Church      Somerville, MA      02143-2841</option>'+
          '<option value="Dormition of the Virgin Mary Church      Winchester, VA      22601-2807">Dormition of the Virgin Mary Church      Winchester, VA      22601-2807</option>'+
          '<option value="Evangelismos Church      Easton, PA      18042">Evangelismos Church      Easton, PA      18042</option>'+
          '<option value="Evangelismos Church      Farrell, PA      16121-1871">Evangelismos Church      Farrell, PA      16121-1871</option>'+
          '<option value="Evangelismos Church      Philadelphia, PA      19149-2906">Evangelismos Church      Philadelphia, PA      19149-2906</option>'+
          '<option value="Evangelismos Tis Theotokou Church      Jersey City, NJ      07306-2411">Evangelismos Tis Theotokou Church      Jersey City, NJ      07306-2411</option>'+
          '<option value="Greek Orthodox Mission of South Orange County      San Juan Capistrano, CA      92675">Greek Orthodox Mission of South Orange County      San Juan Capistrano, CA      92675</option>'+
          '<option value="Greek Orthodox Mission Parish of Utah      Salt Lake City, UT      84110">Greek Orthodox Mission Parish of Utah      Salt Lake City, UT      84110</option>'+
          '<option value="Greek Orthodox Parish of Loudoun County      Dulles, VA      20166-6856">Greek Orthodox Parish of Loudoun County      Dulles, VA      20166-6856</option>'+
          '<option value="Holy Anargyroi/Sts. Cosmas &amp; Damianos Church      Rochester, MN      55902-6231">Holy Anargyroi/Sts. Cosmas &amp; Damianos Church      Rochester, MN      55902-6231</option>'+
          '<option value="Holy Apostles / Sts. Peter &amp; Paul Church      Haverhill, MA      01830-5690">Holy Apostles / Sts. Peter &amp; Paul Church      Haverhill, MA      01830-5690</option>'+
          '<option value="Holy Apostles Church      Cheyenne, WY      82009">Holy Apostles Church      Cheyenne, WY      82009</option>'+
          '<option value="Holy Apostles Church      Indianapolis, IN      46205-1825">Holy Apostles Church      Indianapolis, IN      46205-1825</option>'+
          '<option value="Holy Apostles Church      Westchester, IL      60154-4999">Holy Apostles Church      Westchester, IL      60154-4999</option>'+
          '<option value="Holy Apostles Greek Orthodox Church      Shoreline, WA      98133-3657">Holy Apostles Greek Orthodox Church      Shoreline, WA      98133-3657</option>'+
          '<option value="Holy Apostles Mission Church      Greenville, NC      27833-1055">Holy Apostles Mission Church      Greenville, NC      27833-1055</option>'+
          '<option value="Holy Cross Church      Belmont, CA      94002-1604">Holy Cross Church      Belmont, CA      94002-1604</option>'+
          '<option value="Holy Cross Church      Brooklyn, NY      11209-4327">Holy Cross Church      Brooklyn, NY      11209-4327</option>'+
          '<option value="Holy Cross Church      Farmington Hills, MI      48336-1381">Holy Cross Church      Farmington Hills, MI      48336-1381</option>'+
          '<option value="Holy Cross Church      Flagstaff, AZ      86003-2164">Holy Cross Church      Flagstaff, AZ      86003-2164</option>'+
          '<option value="Holy Cross Church      Justice, IL      60458">Holy Cross Church      Justice, IL      60458</option>'+
          '<option value="Holy Cross Church      Macon, GA      31201-6876">Holy Cross Church      Macon, GA      31201-6876</option>'+
          '<option value="Holy Cross Church      Middletown, NY      10941-4031">Holy Cross Church      Middletown, NY      10941-4031</option>'+
          '<option value="Holy Cross Church      Pittsburgh, PA      15228-1015">Holy Cross Church      Pittsburgh, PA      15228-1015</option>'+
          '<option value="Holy Cross Church      Stroudsburg, PA      18360-2337">Holy Cross Church      Stroudsburg, PA      18360-2337</option>'+
          '<option value="Holy Cross Church      Whitestone, NY      11357-1807">Holy Cross Church      Whitestone, NY      11357-1807</option>'+
          '<option value="Holy Cross Church      Wichita Falls, TX      76309-2902">Holy Cross Church      Wichita Falls, TX      76309-2902</option>'+
          '<option value="Holy Cross/Ss Constantine &amp; Helen Church      Huntsville, AL      35816-3133">Holy Cross/Ss Constantine &amp; Helen Church      Huntsville, AL      35816-3133</option>'+
          '<option value="Holy Mother of God Church      Tallahassee, FL      32308-5303">Holy Mother of God Church      Tallahassee, FL      32308-5303</option>'+
          '<option value="Holy Resurrection Church      Hilton Head, SC      29925-2888">Holy Resurrection Church      Hilton Head, SC      29925-2888</option>'+
          '<option value="Holy Spirit Church      Rochester, NY      14620-2315">Holy Spirit Church      Rochester, NY      14620-2315</option>'+
          '<option value="Holy Taxiarhai and St Haralambos Church      Niles, IL      60714-4503">Holy Taxiarhai and St Haralambos Church      Niles, IL      60714-4503</option>'+
          '<option value="Holy Transfiguration Church      Anchorage, AK      99507-4256">Holy Transfiguration Church      Anchorage, AK      99507-4256</option>'+
          '<option value="Holy Transfiguration Church      Marietta, GA      30066-4660">Holy Transfiguration Church      Marietta, GA      30066-4660</option>'+
          '<option value="Holy Transfiguration Church      Sioux Falls, SD      57105-2726">Holy Transfiguration Church      Sioux Falls, SD      57105-2726</option>'+
          '<option value="Holy Transfiguration Mission      Columbus, GA      31904">Holy Transfiguration Mission      Columbus, GA      31904</option>'+
          '<option value="Holy Trinity - St Nicholas Church      Cincinnati, OH      45224-1331">Holy Trinity - St Nicholas Church      Cincinnati, OH      45224-1331</option>'+
          '<option value="Holy Trinity - St Nicholas Church      Staten Island, NY      10314-1570">Holy Trinity - St Nicholas Church      Staten Island, NY      10314-1570</option>'+
          '<option value="Holy Trinity &amp; Holy Cross Cathedral      Birmingham, AL      35233-1919">Holy Trinity &amp; Holy Cross Cathedral      Birmingham, AL      35233-1919</option>'+
          '<option value="Holy Trinity &amp; St John the Theologian Church      Jackson, MS      39211">Holy Trinity &amp; St John the Theologian Church      Jackson, MS      39211</option>'+
          '<option value="Holy Trinity Cathedral      Camp Hill, PA      17011-1239">Holy Trinity Cathedral      Camp Hill, PA      17011-1239</option>'+
          '<option value="Holy Trinity Cathedral      New Orleans, LA      70122-1337">Holy Trinity Cathedral      New Orleans, LA      70122-1337</option>'+
          '<option value="Holy Trinity Cathedral      New York, NY      10021-3797">Holy Trinity Cathedral      New York, NY      10021-3797</option>'+
          '<option value="Holy Trinity Cathedral      Phoenix, AZ      85016-1415">Holy Trinity Cathedral      Phoenix, AZ      85016-1415</option>'+
          '<option value="Holy Trinity Cathedral      Portland, OR      97232-2501">Holy Trinity Cathedral      Portland, OR      97232-2501</option>'+
          '<option value="Holy Trinity Cathedral      Salt Lake City, UT      84101-1703">Holy Trinity Cathedral      Salt Lake City, UT      84101-1703</option>'+
          '<option value="Holy Trinity Cathedral      Toledo, OH      43604-1737">Holy Trinity Cathedral      Toledo, OH      43604-1737</option>'+
          '<option value="Holy Trinity Church      Altoona, PA      16601-3339">Holy Trinity Church      Altoona, PA      16601-3339</option>'+
          '<option value="Holy Trinity Church      Ambridge, PA      15003-1418">Holy Trinity Church      Ambridge, PA      15003-1418</option>'+
          '<option value="Holy Trinity Church      Asheville, NC      28814-8369">Holy Trinity Church      Asheville, NC      28814-8369</option>'+
          '<option value="Holy Trinity Church      Augusta, GA      30901-2205">Holy Trinity Church      Augusta, GA      30901-2205</option>'+
          '<option value="Holy Trinity Church      Baton Rouge, LA      70884">Holy Trinity Church      Baton Rouge, LA      70884</option>'+
          '<option value="Holy Trinity Church      Biloxi, MS      39535">Holy Trinity Church      Biloxi, MS      39535</option>'+
          '<option value="Holy Trinity Church      Binghamton, NY      13901-3605">Holy Trinity Church      Binghamton, NY      13901-3605</option>'+
          '<option value="Holy Trinity Church      Bluff City, TN      37618-1868">Holy Trinity Church      Bluff City, TN      37618-1868</option>'+
          '<option value="Holy Trinity Church      Bridgeport, CT      06604-1047">Holy Trinity Church      Bridgeport, CT      06604-1047</option>'+
          '<option value="Holy Trinity Church      Canton, OH      44709-1348">Holy Trinity Church      Canton, OH      44709-1348</option>'+
          '<option value="Holy Trinity Church      Carmel, IN      46032-5513">Holy Trinity Church      Carmel, IN      46032-5513</option>'+
          '<option value="Holy Trinity Church      Casper, WY      82602-1465">Holy Trinity Church      Casper, WY      82602-1465</option>'+
          '<option value="Holy Trinity Church      Charleston, SC      29403-4606">Holy Trinity Church      Charleston, SC      29403-4606</option>'+
          '<option value="Holy Trinity Church      Chicago, IL      60639-1139">Holy Trinity Church      Chicago, IL      60639-1139</option>'+
          '<option value="Holy Trinity Church      Clearwater, FL      33765-4410">Holy Trinity Church      Clearwater, FL      33765-4410</option>'+
          '<option value="Holy Trinity Church      Columbia, SC      29201-2503">Holy Trinity Church      Columbia, SC      29201-2503</option>'+
          '<option value="Holy Trinity Church      Concor, NH      03301-4330">Holy Trinity Church      Concor, NH      03301-4330</option>'+
          '<option value="Holy Trinity Church      Dallas, TX      75240-5412">Holy Trinity Church      Dallas, TX      75240-5412</option>'+
          '<option value="Holy Trinity Church      Danielson, CT      06239-0236">Holy Trinity Church      Danielson, CT      06239-0236</option>'+
          '<option value="Holy Trinity Church      Egg Harbor Township, NJ      08234-9651">Holy Trinity Church      Egg Harbor Township, NJ      08234-9651</option>'+
          '<option value="Holy Trinity Church      Fitchburg, MA      01420-3033">Holy Trinity Church      Fitchburg, MA      01420-3033</option>'+
          '<option value="Holy Trinity Church      Fond Du Lac, WI      54936-0011">Holy Trinity Church      Fond Du Lac, WI      54936-0011</option>'+
          '<option value="Holy Trinity Church      Fort Wayne, IN      46825-2729">Holy Trinity Church      Fort Wayne, IN      46825-2729</option>'+
          '<option value="Holy Trinity Church      Grand Rapids, MI      49503-3815">Holy Trinity Church      Grand Rapids, MI      49503-3815</option>'+
          '<option value="Holy Trinity Church      Hicksville, NY      11801-5321">Holy Trinity Church      Hicksville, NY      11801-5321</option>'+
          '<option value="Holy Trinity Church      Holyoke, MA      01040-5610">Holy Trinity Church      Holyoke, MA      01040-5610</option>'+
          '<option value="Holy Trinity Church      Lansing, MI      48912-2316">Holy Trinity Church      Lansing, MI      48912-2316</option>'+
          '<option value="Holy Trinity Church      Lewiston, ME      04243-1344">Holy Trinity Church      Lewiston, ME      04243-1344</option>'+
          '<option value="Holy Trinity Church      Lowell, MA      01854-4213">Holy Trinity Church      Lowell, MA      01854-4213</option>'+
          '<option value="Holy Trinity Church      Maitland, FL      32751-3159">Holy Trinity Church      Maitland, FL      32751-3159</option>'+
          '<option value="Holy Trinity Church      Nashvill, TN      37220-1517">Holy Trinity Church      Nashvill, TN      37220-1517</option>'+
          '<option value="Holy Trinity Church      New Rochelle, NY      10804-2119">Holy Trinity Church      New Rochelle, NY      10804-2119</option>'+
          '<option value="Holy Trinity Church      Norwich, CT      06360-3517">Holy Trinity Church      Norwich, CT      06360-3517</option>'+
          '<option value="Holy Trinity Church      Pittsburgh, PA      15237">Holy Trinity Church      Pittsburgh, PA      15237</option>'+
          '<option value="Holy Trinity Church      Portland, ME      04101-3808">Holy Trinity Church      Portland, ME      04101-3808</option>'+
          '<option value="Holy Trinity Church      Pt Charlotte, FL      33980-2702">Holy Trinity Church      Pt Charlotte, FL      33980-2702</option>'+
          '<option value="Holy Trinity Church      Raleigh, NC      27612">Holy Trinity Church      Raleigh, NC      27612</option>'+
          '<option value="Holy Trinity Church      Roanoke, VA      24012-3605">Holy Trinity Church      Roanoke, VA      24012-3605</option>'+
          '<option value="Holy Trinity Church      Rock Springs, WY      82901">Holy Trinity Church      Rock Springs, WY      82901</option>'+
          '<option value="Holy Trinity Church      San Francisco, CA      94132-2904">Holy Trinity Church      San Francisco, CA      94132-2904</option>'+
          '<option value="Holy Trinity Church      Sioux City, IA      51101-1818">Holy Trinity Church      Sioux City, IA      51101-1818</option>'+
          '<option value="Holy Trinity Church      Spokane, WA      99205-4769">Holy Trinity Church      Spokane, WA      99205-4769</option>'+
          '<option value="Holy Trinity Church      St Augustine, FL      32084-2718">Holy Trinity Church      St Augustine, FL      32084-2718</option>'+
          '<option value="Holy Trinity Church      Steubenville, OH      43952-5788">Holy Trinity Church      Steubenville, OH      43952-5788</option>'+
          '<option value="Holy Trinity Church      Tulsa, OK      74119-2612">Holy Trinity Church      Tulsa, OK      74119-2612</option>'+
          '<option value="Holy Trinity Church      Waterbury, CT      06708-2903">Holy Trinity Church      Waterbury, CT      06708-2903</option>'+
          '<option value="Holy Trinity Church      Westfield, NJ      07090-1109">Holy Trinity Church      Westfield, NJ      07090-1109</option>'+
          '<option value="Holy Trinity Church      Wichita, KS      67208-3439">Holy Trinity Church      Wichita, KS      67208-3439</option>'+
          '<option value="Holy Trinity Church      Wilmington, DE      19806-4625">Holy Trinity Church      Wilmington, DE      19806-4625</option>'+
          '<option value="Holy Trinity Greek Orthodox Cathedral      Charlotte, NC      28203-5112">Holy Trinity Greek Orthodox Cathedral      Charlotte, NC      28203-5112</option>'+
          '<option value="Kimisis Tis Theotokou Church      Aliquippa, PA      15001-2706">Kimisis Tis Theotokou Church      Aliquippa, PA      15001-2706</option>'+
          '<option value="Kimisis Tis Theotokou Church      Brooklyn, NY      11215-5303">Kimisis Tis Theotokou Church      Brooklyn, NY      11215-5303</option>'+
          '<option value="Kimisis Tis Theotokou Church      Holmdel, NJ      07733-1614">Kimisis Tis Theotokou Church      Holmdel, NJ      07733-1614</option>'+
          '<option value="Kimisis Tis Theotokou Church      island Park, NY      11558">Kimisis Tis Theotokou Church      island Park, NY      11558</option>'+
          '<option value="Kimisis Tis Theotokou Church      Poughkeepsie, NY      12603-3010">Kimisis Tis Theotokou Church      Poughkeepsie, NY      12603-3010</option>'+
          '<option value="Kimisis Tis Theotokou Church      Southampton, NY      11968-3807">Kimisis Tis Theotokou Church      Southampton, NY      11968-3807</option>'+
          '<option value="Kimissis Tis Theotokou Church      Racine, WI      53406-4405">Kimissis Tis Theotokou Church      Racine, WI      53406-4405</option>'+
          '<option value="Koimisis Tis Theotokou Church      Erie, PA      16505-1416">Koimisis Tis Theotokou Church      Erie, PA      16505-1416</option>'+
          '<option value="Maui Orthodox Christian Mission      Kihei, MA      96753">Maui Orthodox Christian Mission      Kihei, MA      96753</option>'+
          '<option value="Nativity of Christ Church      Novato, CA      94949-5481">Nativity of Christ Church      Novato, CA      94949-5481</option>'+
          '<option value="Nativity of the Theotokos Church      Fredericksburg, VA      22407">Nativity of the Theotokos Church      Fredericksburg, VA      22407</option>'+
          '<option value="Nativity of the Virgin Mary Church      Plymouth, MI      48170-2708">Nativity of the Virgin Mary Church      Plymouth, MI      48170-2708</option>'+
          '<option value="Nativity-Assumption of the Virgin Mary Church      Cohasset, MA      02025-1046">Nativity-Assumption of the Virgin Mary Church      Cohasset, MA      02025-1046</option>'+
          '<option value="Panagia Pantovasilissa Church      Lexington, KY      40502-2203">Panagia Pantovasilissa Church      Lexington, KY      40502-2203</option>'+
          '<option value="Presentation of Christ Church      East Pittsburgh, PA      15112-0310">Presentation of Christ Church      East Pittsburgh, PA      15112-0310</option>'+
          '<option value="Prophet Elias Church      Holladay, UT      84117-7633">Prophet Elias Church      Holladay, UT      84117-7633</option>'+
          '<option value="Prophet Elias Church      San Bernardino, CA      92402-0311">Prophet Elias Church      San Bernardino, CA      92402-0311</option>'+
          '<option value="Prophet Elias Church      Santa Cruz, CA      95060-3809">Prophet Elias Church      Santa Cruz, CA      95060-3809</option>'+
          '<option value="Prophet Elias Church      Yonkers, NY      10705-4519">Prophet Elias Church      Yonkers, NY      10705-4519</option>'+
          '<option value="St Andrew Church      Chicago, IL      60660-4899">St Andrew Church      Chicago, IL      60660-4899</option>'+
          '<option value="St Andrew Church      Lubbock, TX      79493-3705">St Andrew Church      Lubbock, TX      79493-3705</option>'+
          '<option value="St Andrew Church      Miami, FL      33156-7456">St Andrew Church      Miami, FL      33156-7456</option>'+
          '<option value="St Andrew Church      Randolph, NJ      07869-1830">St Andrew Church      Randolph, NJ      07869-1830</option>'+
          '<option value="St Andrew Church      South Bend, IN      46635-1124">St Andrew Church      South Bend, IN      46635-1124</option>'+
          '<option value="St Andrew the Apostle Greek Orthodox Church      San Luis Obispo, CA      93405-1540">St Andrew the Apostle Greek Orthodox Church      San Luis Obispo, CA      93405-1540</option>'+
          '<option value="St Anna Church      Flemington, NJ      08822">St Anna Church      Flemington, NJ      08822</option>'+
          '<option value="St Anna Greek Orthodox Church      Roseville, CA      95661-4093">St Anna Greek Orthodox Church      Roseville, CA      95661-4093</option>'+
          '<option value="St Anthony Church      Clairton, PA      15025-0031">St Anthony Church      Clairton, PA      15025-0031</option>'+
          '<option value="St Anthony Church      Pasadena, CA      91107-5613">St Anthony Church      Pasadena, CA      91107-5613</option>'+
          '<option value="St Anthony Church      Reno, NV      89509-5814">St Anthony Church      Reno, NV      89509-5814</option>'+
          '<option value="St Anthony Church      Springfield, IL      62704-3611">St Anthony Church      Springfield, IL      62704-3611</option>'+
          '<option value="St Anthony Church      Vineland, NJ      08360-1911">St Anthony Church      Vineland, NJ      08360-1911</option>'+
          '<option value="St Athanasios Church      Aurora, IL      60504-8776">St Athanasios Church      Aurora, IL      60504-8776</option>'+
          '<option value="St Athanasios Church      Elmira, NY      14904-1706">St Athanasios Church      Elmira, NY      14904-1706</option>'+
          '<option value="St Athanasios Church      Paramus, NJ      07652-1320">St Athanasios Church      Paramus, NJ      07652-1320</option>'+
          '<option value="St Athanasios Hellenic Orthodox Mission      Gulf Shores, AL      36547-3668">St Athanasios Hellenic Orthodox Mission      Gulf Shores, AL      36547-3668</option>'+
          '<option value="St Athanasius the Great Church      Arlington, MA      02476-5966">St Athanasius the Great Church      Arlington, MA      02476-5966</option>'+
          '<option value="St Barbara Church      Durham, NC      27713-6860">St Barbara Church      Durham, NC      27713-6860</option>'+
          '<option value="St Barbara Church      New York, NY      10002-6001">St Barbara Church      New York, NY      10002-6001</option>'+
          '<option value="St Barbara Church      Orange, CT      06477-2514">St Barbara Church      Orange, CT      06477-2514</option>'+
          '<option value="St Barbara Church      Santa Barbara, CA      93111-1313">St Barbara Church      Santa Barbara, CA      93111-1313</option>'+
          '<option value="St Barbara Church      Toms River, NJ      08753-8106">St Barbara Church      Toms River, NJ      08753-8106</option>'+
          '<option value="St Barbara Greek Orthodox Church      Sarasota, FL      34243-4931">St Barbara Greek Orthodox Church      Sarasota, FL      34243-4931</option>'+
          '<option value="St Basil Church      Chicago, IL      60607-3103">St Basil Church      Chicago, IL      60607-3103</option>'+
          '<option value="St Basil Church      San Jose, CA      95120-3413">St Basil Church      San Jose, CA      95120-3413</option>'+
          '<option value="St Basil Church      Stockton, CA      95207-6209">St Basil Church      Stockton, CA      95207-6209</option>'+
          '<option value="St Basil Church      Troy, NY      12180-1243">St Basil Church      Troy, NY      12180-1243</option>'+
          '<option value="St Basil the Great Church      Houston, TX      77077-1647">St Basil the Great Church      Houston, TX      77077-1647</option>'+
          '<option value="St Basil the Great Church      New Haven, CT      06533-0356">St Basil the Great Church      New Haven, CT      06533-0356</option>'+
          '<option value="St Catherine Church      Braintree, MA      02184-1767">St Catherine Church      Braintree, MA      02184-1767</option>'+
          '<option value="St Catherine Church      Greenwood Village, CO      80111-3319">St Catherine Church      Greenwood Village, CO      80111-3319</option>'+
          '<option value="St Catherine Church      Ithaca, NY      14850-4138">St Catherine Church      Ithaca, NY      14850-4138</option>'+
          '<option value="St Catherine Church      West Palm Beach, FL      33405-2736">St Catherine Church      West Palm Beach, FL      33405-2736</option>'+
          '<option value="St Christopher Hellenic Orthodox Church      Peachtree Cty, GA      30269-1933">St Christopher Hellenic Orthodox Church      Peachtree Cty, GA      30269-1933</option>'+
          '<option value="St Demetrios Cathedral      Astoria, NY      11102-1854">St Demetrios Cathedral      Astoria, NY      11102-1854</option>'+
          '<option value="St Demetrios Church      Baltimore, MD      21234-8218">St Demetrios Church      Baltimore, MD      21234-8218</option>'+
          '<option value="St Demetrios Church      Bristol, CT      06010-4936">St Demetrios Church      Bristol, CT      06010-4936</option>'+
          '<option value="St Demetrios Church      Camarillo, CA      93011-1970">St Demetrios Church      Camarillo, CA      93011-1970</option>'+
          '<option value="St Demetrios Church      Chicago, IL      60625-2508">St Demetrios Church      Chicago, IL      60625-2508</option>'+
          '<option value="St Demetrios Church      Concord, CA      94521-1627">St Demetrios Church      Concord, CA      94521-1627</option>'+
          '<option value="St Demetrios Church      Daytona Beach, FL      32118-4250">St Demetrios Church      Daytona Beach, FL      32118-4250</option>'+
          '<option value="St Demetrios Church      Elmhurst, IL      60126-1005">St Demetrios Church      Elmhurst, IL      60126-1005</option>'+
          '<option value="St Demetrios Church      Fall River, MA      02720-2320">St Demetrios Church      Fall River, MA      02720-2320</option>'+
          '<option value="St Demetrios Church      Fort Worth, TX      76164">St Demetrios Church      Fort Worth, TX      76164</option>'+
          '<option value="St Demetrios Church      Ft Lauderdale, FL      33304-4402">St Demetrios Church      Ft Lauderdale, FL      33304-4402</option>'+
          '<option value="St Demetrios Church      Hammond, IN      46324-1813">St Demetrios Church      Hammond, IN      46324-1813</option>'+
          '<option value="St Demetrios Church      Jamaica, NY      11432-1641">St Demetrios Church      Jamaica, NY      11432-1641</option>'+
          '<option value="St Demetrios Church      Jersey City, NJ      07306-2913">St Demetrios Church      Jersey City, NJ      07306-2913</option>'+
          '<option value="St Demetrios Church      Libertyville, IL      60048-4229">St Demetrios Church      Libertyville, IL      60048-4229</option>'+
          '<option value="St Demetrios Church      Merrick, NY      11566-3918">St Demetrios Church      Merrick, NY      11566-3918</option>'+
          '<option value="St Demetrios Church      North Wildwood, NJ      08260-3107">St Demetrios Church      North Wildwood, NJ      08260-3107</option>'+
          '<option value="St Demetrios Church      Parkville, MD      21234-1097">St Demetrios Church      Parkville, MD      21234-1097</option>'+
          '<option value="St Demetrios Church      Perth Amboy, NJ      08861-4723">St Demetrios Church      Perth Amboy, NJ      08861-4723</option>'+
          '<option value="St Demetrios Church      Rocky River, OH      44116-3047">St Demetrios Church      Rocky River, OH      44116-3047</option>'+
          '<option value="St Demetrios Church      Saco, ME      04072-3103">St Demetrios Church      Saco, ME      04072-3103</option>'+
          '<option value="St Demetrios Church      Saginaw, MI      48603-7249">St Demetrios Church      Saginaw, MI      48603-7249</option>'+
          '<option value="St Demetrios Church      Seattle, WA      98112-2115">St Demetrios Church      Seattle, WA      98112-2115</option>'+
          '<option value="St Demetrios Church      Tucson, AZ      85719-2116">St Demetrios Church      Tucson, AZ      85719-2116</option>'+
          '<option value="St Demetrios Church      Union, NJ      07083">St Demetrios Church      Union, NJ      07083</option>'+
          '<option value="St Demetrios Church      Upper Darby, PA      19082-3328">St Demetrios Church      Upper Darby, PA      19082-3328</option>'+
          '<option value="St Demetrios Church      Warren, OH      44482-4214">St Demetrios Church      Warren, OH      44482-4214</option>'+
          '<option value="St Demetrios Church      Waterloo, IA      50702-1501">St Demetrios Church      Waterloo, IA      50702-1501</option>'+
          '<option value="St Demetrios Church      Weston, MA      02493">St Demetrios Church      Weston, MA      02493</option>'+
          '<option value="St Demetrios Church      Willamsburg, VA      23187">St Demetrios Church      Willamsburg, VA      23187</option>'+
          '<option value="St Dionysios Church      Overland Park, KS      66212-3214">St Dionysios Church      Overland Park, KS      66212-3214</option>'+
          '<option value="St Eleftherios Church      New York, NY      10011-1501">St Eleftherios Church      New York, NY      10011-1501</option>'+
          '<option value="St Elias The Prophet Church      Dubuque, IA      52003-8739">St Elias The Prophet Church      Dubuque, IA      52003-8739</option>'+
          '<option value="St Elias The Prophet Church      Santa Fe, NM      87508-9143">St Elias The Prophet Church      Santa Fe, NM      87508-9143</option>'+
          '<option value="St Elizabeth the Wonderworker Church      Gainesville, FL      32653-4318">St Elizabeth the Wonderworker Church      Gainesville, FL      32653-4318</option>'+
          '<option value="St Elpis Church      Hopewell, VA      23860-1204">St Elpis Church      Hopewell, VA      23860-1204</option>'+
          '<option value="St Fanourios Church      Elizabeth, NJ      07201-2544">St Fanourios Church      Elizabeth, NJ      07201-2544</option>'+
          '<option value="St George - St Demetrios Church      New York, NY      10029-0293">St George - St Demetrios Church      New York, NY      10029-0293</option>'+
          '<option value="St George Cathedral      Greenville, SC      29601-2046">St George Cathedral      Greenville, SC      29601-2046</option>'+
          '<option value="St George Cathedral      Hartford, CT      06114-2718">St George Cathedral      Hartford, CT      06114-2718</option>'+
          '<option value="St George Cathedral      Manchester, NH      03104-5306">St George Cathedral      Manchester, NH      03104-5306</option>'+
          '<option value="St George Cathedral      Philadelphia, PA      19107-5731">St George Cathedral      Philadelphia, PA      19107-5731</option>'+
          '<option value="St George Cathedral      Springfield, MA      01104-3332">St George Cathedral      Springfield, MA      01104-3332</option>'+
          '<option value="St George Chapel      Brunswich, GA      31520-8241">St George Chapel      Brunswich, GA      31520-8241</option>'+
          '<option value="St George Church      Albuquerque, NM      87102-3631">St George Church      Albuquerque, NM      87102-3631</option>'+
          '<option value="St George Church      Bakersfield, CA      93301-5315">St George Church      Bakersfield, CA      93301-5315</option>'+
          '<option value="St George Church      Bangor, ME      04401-6132">St George Church      Bangor, ME      04401-6132</option>'+
          '<option value="St George Church      Bloomfield, MI      48302-5019">St George Church      Bloomfield, MI      48302-5019</option>'+
          '<option value="St George Church      Centerville/Hyannis, MA      02632-3022">St George Church      Centerville/Hyannis, MA      02632-3022</option>'+
          '<option value="St George Church      Chicago, IL      60614-1326">St George Church      Chicago, IL      60614-1326</option>'+
          '<option value="St George Church      Clifton, NJ      07013-2206">St George Church      Clifton, NJ      07013-2206</option>'+
          '<option value="St George Church      Dartmouth, MA      02747-0985">St George Church      Dartmouth, MA      02747-0985</option>'+
          '<option value="St George Church      Dekalb, IL      60115-3718">St George Church      Dekalb, IL      60115-3718</option>'+
          '<option value="St George Church      Des Moines, IA      50311-3704">St George Church      Des Moines, IA      50311-3704</option>'+
          '<option value="St George Church      Downey, CA      90241-3720">St George Church      Downey, CA      90241-3720</option>'+
          '<option value="St George Church      Eugene, OR      97408-5018">St George Church      Eugene, OR      97408-5018</option>'+
          '<option value="St George Church      Fresno, CA      93703-2323">St George Church      Fresno, CA      93703-2323</option>'+
          '<option value="St George Church      High Point, NC      27262-4027">St George Church      High Point, NC      27262-4027</option>'+
          '<option value="St George Church      Hollywood, FL      33021-6213">St George Church      Hollywood, FL      33021-6213</option>'+
          '<option value="St George Church      Huntington, WV      25727-2822">St George Church      Huntington, WV      25727-2822</option>'+
          '<option value="St George Church      Keene, NH      03431-0392">St George Church      Keene, NH      03431-0392</option>'+
          '<option value="St George Church      Kingston, NY      12401-5342">St George Church      Kingston, NY      12401-5342</option>'+
          '<option value="St George Church      Knoxville, TN      37919-5245">St George Church      Knoxville, TN      37919-5245</option>'+
          '<option value="St George Church      Lowell, MA      01851-2405">St George Church      Lowell, MA      01851-2405</option>'+
          '<option value="St George Church      Lynchburg, VA      24503-3120">St George Church      Lynchburg, VA      24503-3120</option>'+
          '<option value="St George Church      Lynn, MA      01902-4495">St George Church      Lynn, MA      01902-4495</option>'+
          '<option value="St George Church      Massillon, OH      44646-6718">St George Church      Massillon, OH      44646-6718</option>'+
          '<option value="St George Church      Media, PA      19063-4345">St George Church      Media, PA      19063-4345</option>'+
          '<option value="St George Church      New Britain, CT      06050-1753">St George Church      New Britain, CT      06050-1753</option>'+
          '<option value="St George Church      New Castle, PA      16105-1805">St George Church      New Castle, PA      16105-1805</option>'+
          '<option value="St George Church      New Port Richey, FL      34654-3417">St George Church      New Port Richey, FL      34654-3417</option>'+
          '<option value="St George Church      New York, NY      10019-5101">St George Church      New York, NY      10019-5101</option>'+
          '<option value="St George Church      Norwalk, CT      06851-1133">St George Church      Norwalk, CT      06851-1133</option>'+
          '<option value="St George Church      Ocean City, MD      21842-2739">St George Church      Ocean City, MD      21842-2739</option>'+
          '<option value="St George Church      Ocean, NJ      0+F2987712">St George Church      Ocean, NJ      0+F2987712</option>'+
          '<option value="St George Church      Oklahoma City, OK      73134-6112">St George Church      Oklahoma City, OK      73134-6112</option>'+
          '<option value="St George Church      Palm Desert, CA      92261-4755">St George Church      Palm Desert, CA      92261-4755</option>'+
          '<option value="St George Church      Piscataway, NJ      08854-5620">St George Church      Piscataway, NJ      08854-5620</option>'+
          '<option value="St George Church      Pittsfield, MA      01201-4523">St George Church      Pittsfield, MA      01201-4523</option>'+
          '<option value="St George Church      Port Arthur, TX      77643-3035">St George Church      Port Arthur, TX      77643-3035</option>'+
          '<option value="St George Church      Prescott, AZ      86305-3619">St George Church      Prescott, AZ      86305-3619</option>'+
          '<option value="St George Church      Redding, CA      96001-1090">St George Church      Redding, CA      96001-1090</option>'+
          '<option value="St George Church      Rock Island, IL      61201-6323">St George Church      Rock Island, IL      61201-6323</option>'+
          '<option value="St George Church      Saint Paul, MN      55105-2648">St George Church      Saint Paul, MN      55105-2648</option>'+
          '<option value="St George Church      Sault Sainte Marie, MI      49783-0842">St George Church      Sault Sainte Marie, MI      49783-0842</option>'+
          '<option value="St George Church      Schenectady, NY      12305">St George Church      Schenectady, NY      12305</option>'+
          '<option value="St George Church      Schererville, IN      46375-2352">St George Church      Schererville, IN      46375-2352</option>'+
          '<option value="St George Church      Shreveport, LA      71101-4725">St George Church      Shreveport, LA      71101-4725</option>'+
          '<option value="St George Church      Southbridge, MA      01550-0025">St George Church      Southbridge, MA      01550-0025</option>'+
          '<option value="St George Church      Southgate, MI      48195-2970">St George Church      Southgate, MI      48195-2970</option>'+
          '<option value="St George Church      Trenton, NJ      08619-3614">St George Church      Trenton, NJ      08619-3614</option>'+
          '<option value="St George Greek Orthodox Church      Bethesda, MD      20817">St George Greek Orthodox Church      Bethesda, MD      20817</option>'+
          '<option value="St Gerasimos Church      New York, NY      10025-4024">St Gerasimos Church      New York, NY      10025-4024</option>'+
          '<option value="St Gregory of Nyssa Church      El Cajon, CA      92019-3752">St Gregory of Nyssa Church      El Cajon, CA      92019-3752</option>'+
          '<option value="St Gregory The Theologian Church      Mansfield, MA      02048-0293">St Gregory The Theologian Church      Mansfield, MA      02048-0293</option>'+
          '<option value="St Haralambos Church      Canton, OH      44709-3923">St Haralambos Church      Canton, OH      44709-3923</option>'+
          '<option value="St Haralambos Church      Peoria, AZ      85383-1674">St Haralambos Church      Peoria, AZ      85383-1674</option>'+
          '<option value="St Iakovos Church      Valparaiso, IN      46385">St Iakovos Church      Valparaiso, IN      46385</option>'+
          '<option value="St John Chrysostom Greek Orthodox Church      Hobe Sound, FL      33475">St John Chrysostom Greek Orthodox Church      Hobe Sound, FL      33475</option>'+
          '<option value="St John Chrysostom Greek Orthodox Mission      Nashville, TN      37209">St John Chrysostom Greek Orthodox Mission      Nashville, TN      37209</option>'+
          '<option value="St John Church      Blue Point, NY      11715-0066">St John Church      Blue Point, NY      11715-0066</option>'+
          '<option value="St John Church      Charleston, WV      25304-1420">St John Church      Charleston, WV      25304-1420</option>'+
          '<option value="St John Church      Sterling Hts, MI      48312-2937">St John Church      Sterling Hts, MI      48312-2937</option>'+
          '<option value="St John Church      Youngstown, OH      44512-1460">St John Church      Youngstown, OH      44512-1460</option>'+
          '<option value="St John of Kronstandt Church      Cleveland, OH      44144-1432">St John of Kronstandt Church      Cleveland, OH      44144-1432</option>'+
          '<option value="St John the Baptist Church      Anaheim, CA      92801-4818">St John the Baptist Church      Anaheim, CA      92801-4818</option>'+
          '<option value="St John The Baptist Church      Boston, MA      02118-2129">St John The Baptist Church      Boston, MA      02118-2129</option>'+
          '<option value="St John the Baptist Church      Cedar Rapids, IA      52401-1015">St John the Baptist Church      Cedar Rapids, IA      52401-1015</option>'+
          '<option value="St John the Baptist Church      Craig, CO      81626-0848">St John the Baptist Church      Craig, CO      81626-0848</option>'+
          '<option value="St John the Baptist Church      Des Plaines, IL      60016-4839">St John the Baptist Church      Des Plaines, IL      60016-4839</option>'+
          '<option value="St John the Baptist Church      Euless, TX      76040-4625">St John the Baptist Church      Euless, TX      76040-4625</option>'+
          '<option value="St John the Baptist Church      Las Vegas, NV      89118-1922">St John the Baptist Church      Las Vegas, NV      89118-1922</option>'+
          '<option value="St John The Baptist Church      Myrtle Beach, SC      29577-5883">St John The Baptist Church      Myrtle Beach, SC      29577-5883</option>'+
          '<option value="St John The Baptist Church      New York, NY      10003-3402">St John The Baptist Church      New York, NY      10003-3402</option>'+
          '<option value="St John the Baptist Church      Omaha, NE      68105-2712">St John the Baptist Church      Omaha, NE      68105-2712</option>'+
          '<option value="St John The Baptist Church      Pueblo, CO      81005-0011">St John The Baptist Church      Pueblo, CO      81005-0011</option>'+
          '<option value="St John the Baptist Church      Salinas, CA      93901-2033">St John the Baptist Church      Salinas, CA      93901-2033</option>'+
          '<option value="St John the Baptist Church      Tampa, FL      33609-4712">St John the Baptist Church      Tampa, FL      33609-4712</option>'+
          '<option value="St John the Baptist Greek Orthodox Church      Beaverton, OR      97006-6041">St John the Baptist Greek Orthodox Church      Beaverton, OR      97006-6041</option>'+
          '<option value="St John the Divine Church      Jacksonville, FL      32207-2033">St John the Divine Church      Jacksonville, FL      32207-2033</option>'+
          '<option value="St John the Divine Church      Wheeling, WV      26003-3842">St John the Divine Church      Wheeling, WV      26003-3842</option>'+
          '<option value="St John the Prodromos Church      Amarillo, TX      79106-4215">St John the Prodromos Church      Amarillo, TX      79106-4215</option>'+
          '<option value="St John the Theologian Cathedral      Tenafly, NJ      07670-2319">St John the Theologian Cathedral      Tenafly, NJ      07670-2319</option>'+
          '<option value="St John The Theologian Church      Panama City, FL      32405-4211">St John The Theologian Church      Panama City, FL      32405-4211</option>'+
          '<option value="St John the Theologian Church      Webster, TX      77598-5125">St John the Theologian Church      Webster, TX      77598-5125</option>'+
          '<option value="St Johns Chapel (Closed)      Destin, FL      32541-7337">St Johns Chapel (Closed)      Destin, FL      32541-7337</option>'+
          '<option value="St Katherine Church      Burlington, NC      27216-1004">St Katherine Church      Burlington, NC      27216-1004</option>'+
          '<option value="St Katherine Church      Chandler, AZ      85224-1806">St Katherine Church      Chandler, AZ      85224-1806</option>'+
          '<option value="St Katherine Church      Falls Church, VA      22041-2430">St Katherine Church      Falls Church, VA      22041-2430</option>'+
          '<option value="St Katherine Church      Naples, FL      34109">St Katherine Church      Naples, FL      34109</option>'+
          '<option value="St Katherine Church      Redondo Beach, CA      90277-4345">St Katherine Church      Redondo Beach, CA      90277-4345</option>'+
          '<option value="St Katherine Greek Orthodox Church      Elk Grove, CA      95758-7420">St Katherine Greek Orthodox Church      Elk Grove, CA      95758-7420</option>'+
          '<option value="St Katherine Greek Orthodox Church      Melbourne, FL      32940-2003">St Katherine Greek Orthodox Church      Melbourne, FL      32940-2003</option>'+
          '<option value="St Katherine-St George Church      Astoria, NY      11105">St Katherine-St George Church      Astoria, NY      11105</option>'+
          '<option value="St Luke Church      Broomall, PA      19008-1932">St Luke Church      Broomall, PA      19008-1932</option>'+
          '<option value="St Luke Church      East Longmeadow, MA      01028-0381">St Luke Church      East Longmeadow, MA      01028-0381</option>'+
          '<option value="St Luke Greek Orthodox Church      Mooresville, NC      28115-1513">St Luke Greek Orthodox Church      Mooresville, NC      28115-1513</option>'+
          '<option value="St Luke the Evangelist Church      Columbia, MO      65201-6277">St Luke the Evangelist Church      Columbia, MO      65201-6277</option>'+
          '<option value="St Mark Church      Belleview, FL      34420">St Mark Church      Belleview, FL      34420</option>'+
          '<option value="St Mark Church      Boca Raton, FL      33431-4323">St Mark Church      Boca Raton, FL      33431-4323</option>'+
          '<option value="St Markella Church      Wantagh, NY      11793-3352">St Markella Church      Wantagh, NY      11793-3352</option>'+
          '<option value="St Mary Church      Johnstown, PA      15901-2529">St Mary Church      Johnstown, PA      15901-2529</option>'+
          '<option value="St Mary Church      Minneapolis, MN      55408-3334">St Mary Church      Minneapolis, MN      55408-3334</option>'+
          '<option value="St Matthew Church      Blandon, PA      19510-9451">St Matthew Church      Blandon, PA      19510-9451</option>'+
          '<option value="St Nectarios Church      Covina, CA      91722-8459">St Nectarios Church      Covina, CA      91722-8459</option>'+
          '<option value="St Nectarios Church      Palatine, IL      60067-5855">St Nectarios Church      Palatine, IL      60067-5855</option>'+
          '<option value="St Nectarios Church      Roslindale, MA      02131-3025">St Nectarios Church      Roslindale, MA      02131-3025</option>'+
          '<option value="St Nectarios Mission      Pasco, WA      99301-5432">St Nectarios Mission      Pasco, WA      99301-5432</option>'+
          '<option value="St Nektarios Church      Charlotte, NC      28270-0269">St Nektarios Church      Charlotte, NC      28270-0269</option>'+
          '<option value="St Nicholas Albanian Church      Chicago, IL      60639-1031">St Nicholas Albanian Church      Chicago, IL      60639-1031</option>'+
          '<option value="St Nicholas Cathedral      Pittsburgh, PA      15213-3509">St Nicholas Cathedral      Pittsburgh, PA      15213-3509</option>'+
          '<option value="St Nicholas Cathedral      Tarpon Springs, FL      34689-3449">St Nicholas Cathedral      Tarpon Springs, FL      34689-3449</option>'+
          '<option value="St Nicholas Church      Ann Arbor, MI      48103-9634">St Nicholas Church      Ann Arbor, MI      48103-9634</option>'+
          '<option value="St Nicholas Church      Appleton, WI">St Nicholas Church      Appleton, WI</option>'+
          '<option value="St Nicholas Church      Atlantic City, NJ      08404-0641">St Nicholas Church      Atlantic City, NJ      08404-0641</option>'+
          '<option value="St Nicholas Church      Baltimore, MD      21224">St Nicholas Church      Baltimore, MD      21224</option>'+
          '<option value="St Nicholas Church      Bethlehem, PA      18018-3416">St Nicholas Church      Bethlehem, PA      18018-3416</option>'+
          '<option value="St Nicholas Church      Clinton, MA      01510-0098">St Nicholas Church      Clinton, MA      01510-0098</option>'+
          '<option value="St Nicholas Church      Corpus Christi, TX      78403-0343">St Nicholas Church      Corpus Christi, TX      78403-0343</option>'+
          '<option value="St Nicholas Church      El Paso, TX      79912-5802">St Nicholas Church      El Paso, TX      79912-5802</option>'+
          '<option value="St Nicholas Church      Enfield, CT      06083-1155">St Nicholas Church      Enfield, CT      06083-1155</option>'+
          '<option value="St Nicholas Church      Fort Pierce, FL      34981-5644">St Nicholas Church      Fort Pierce, FL      34981-5644</option>'+
          '<option value="St Nicholas Church      Grand Jct, CO      81506-5437">St Nicholas Church      Grand Jct, CO      81506-5437</option>'+
          '<option value="St Nicholas Church      Jamestown, NY      14702-0264">St Nicholas Church      Jamestown, NY      14702-0264</option>'+
          '<option value="St Nicholas Church      Lexington, MA      02420-5308">St Nicholas Church      Lexington, MA      02420-5308</option>'+
          '<option value="St Nicholas Church      Lorain, OH      44053-3034">St Nicholas Church      Lorain, OH      44053-3034</option>'+
          '<option value="St Nicholas Church      Manchester, NH      03104-5741">St Nicholas Church      Manchester, NH      03104-5741</option>'+
          '<option value="St Nicholas Church      Newburgh, NY      12550-0204">St Nicholas Church      Newburgh, NY      12550-0204</option>'+
          '<option value="St Nicholas Church      Northridge, CA      91325-1901">St Nicholas Church      Northridge, CA      91325-1901</option>'+
          '<option value="St Nicholas Church      Oak Lawn, IL      60453-4845">St Nicholas Church      Oak Lawn, IL      60453-4845</option>'+
          '<option value="St Nicholas Church      Portsmouth, NH      03801-5448">St Nicholas Church      Portsmouth, NH      03801-5448</option>'+
          '<option value="St Nicholas Church      Rutland, VT      05702-0939">St Nicholas Church      Rutland, VT      05702-0939</option>'+
          '<option value="St Nicholas Church      Saint Louis, MO      63108-1401">St Nicholas Church      Saint Louis, MO      63108-1401</option>'+
          '<option value="St Nicholas Church      San Jose, CA      95126-1402">St Nicholas Church      San Jose, CA      95126-1402</option>'+
          '<option value="St Nicholas Church      Spartanburg, SC      29304-1107">St Nicholas Church      Spartanburg, SC      29304-1107</option>'+
          '<option value="St Nicholas Church      Tacoma, WA      98405-4460">St Nicholas Church      Tacoma, WA      98405-4460</option>'+
          '<option value="St Nicholas Church      Temecula, CA      92590-3404">St Nicholas Church      Temecula, CA      92590-3404</option>'+
          '<option value="St Nicholas Church      Troy, MI      48098-4500">St Nicholas Church      Troy, MI      48098-4500</option>'+
          '<option value="St Nicholas Church      Virginia Beach, VA      23451-6121">St Nicholas Church      Virginia Beach, VA      23451-6121</option>'+
          '<option value="St Nicholas Church      Waco, TX      76707-3522">St Nicholas Church      Waco, TX      76707-3522</option>'+
          '<option value="St Nicholas Church      West Babylon, NY      11704-7821">St Nicholas Church      West Babylon, NY      11704-7821</option>'+
          '<option value="St Nicholas Church      Wilmington, NC      28403-3202">St Nicholas Church      Wilmington, NC      28403-3202</option>'+
          '<option value="St Nicholas Church      Wyckoff, NJ      07481-2543">St Nicholas Church      Wyckoff, NJ      07481-2543</option>'+
          '<option value="St Nicholas Church      Youngstown, OH      44503-1623">St Nicholas Church      Youngstown, OH      44503-1623</option>'+
          '<option value="St Nicholas Church (was located inWorld Trade Ctr)      Brooklyn, NY      11234">St Nicholas Church (was located inWorld Trade Ctr)      Brooklyn, NY      11234</option>'+
          '<option value="St Nicholas Shrine Church      Flushing, NY      11358-3037">St Nicholas Shrine Church      Flushing, NY      11358-3037</option>'+
          '<option value="St Panteleimon Chapel      Lexington, MI      48450-8913">St Panteleimon Chapel      Lexington, MI      48450-8913</option>'+
          '<option value="St Paraskevi Shrine Church      Greenlawn, NY      11740-1512">St Paraskevi Shrine Church      Greenlawn, NY      11740-1512</option>'+
          '<option value="St Paul Cathedral      Hempstead, NY      11550-2050">St Paul Cathedral      Hempstead, NY      11550-2050</option>'+
          '<option value="St Paul Church      Irvine, CA      92604-8606">St Paul Church      Irvine, CA      92604-8606</option>'+
          '<option value="St Paul Church      North Royalton, OH      44133-3121">St Paul Church      North Royalton, OH      44133-3121</option>'+
          '<option value="St Paul Church      Savannah, GA      31401-6738">St Paul Church      Savannah, GA      31401-6738</option>'+
          '<option value="St Peter Church      Danville, VA      24543-3392">St Peter Church      Danville, VA      24543-3392</option>'+
          '<option value="St Peter the Apostle Church      Bronx, NY      10463-5514">St Peter the Apostle Church      Bronx, NY      10463-5514</option>'+
          '<option value="St Philip Church      Nashua, NH      03062-1314">St Philip Church      Nashua, NH      03062-1314</option>'+
          '<option value="St Philothea Church      Watkinsville, GA      30677-1580">St Philothea Church      Watkinsville, GA      30677-1580</option>'+
          '<option value="St Photios Nathional Shrine      St Augustine, FL      32085-1960">St Photios Nathional Shrine      St Augustine, FL      32085-1960</option>'+
          '<option value="St Sophia Cathedral      Los Angeles, CA      90006-4310">St Sophia Cathedral      Los Angeles, CA      90006-4310</option>'+
          '<option value="St Sophia Cathedral      Miami, FL      33129-2023">St Sophia Cathedral      Miami, FL      33129-2023</option>'+
          '<option value="St Sophia Cathedral      Washington, DC      20007-1424">St Sophia Cathedral      Washington, DC      20007-1424</option>'+
          '<option value="St Sophia Church      Albany, NY      12208-1643">St Sophia Church      Albany, NY      12208-1643</option>'+
          '<option value="St Sophia Church      Bellingham, WA      98225">St Sophia Church      Bellingham, WA      98225</option>'+
          '<option value="St Sophia Church      Elgin, IL      60123-9307">St Sophia Church      Elgin, IL      60123-9307</option>'+
          '<option value="St Sophia Church      New London, CT      06320-6205">St Sophia Church      New London, CT      06320-6205</option>'+
          '<option value="St Sophia Church      San Antonio, TX      78212-3738">St Sophia Church      San Antonio, TX      78212-3738</option>'+
          '<option value="St Sophia Church      Syracuse , NY      13224-2254">St Sophia Church      Syracuse , NY      13224-2254</option>'+
          '<option value="St Sophia Greek Orthodox Church      Winter Haven, FL      33883-7424">St Sophia Greek Orthodox Church      Winter Haven, FL      33883-7424</option>'+
          '<option value="St Sophia Ss Faith Hope &amp; Agape Church      Jeffersonville, PA      19403-5212">St Sophia Ss Faith Hope &amp; Agape Church      Jeffersonville, PA      19403-5212</option>'+
          '<option value="St Spyridon Cathedral      Worcester, MA      01609-1908">St Spyridon Cathedral      Worcester, MA      01609-1908</option>'+
          '<option value="St Spyridon Chapel      Troy, MI      48084-4703">St Spyridon Chapel      Troy, MI      48084-4703</option>'+
          '<option value="St Spyridon Church      Clarksburg, WV      26302-4176">St Spyridon Church      Clarksburg, WV      26302-4176</option>'+
          '<option value="St Spyridon Church      Monessen, PA      15062-1933">St Spyridon Church      Monessen, PA      15062-1933</option>'+
          '<option value="St Spyridon Church      New York, NY      10033-4812">St Spyridon Church      New York, NY      10033-4812</option>'+
          '<option value="St Spyridon Church      Newport, RI      02840-0400">St Spyridon Church      Newport, RI      02840-0400</option>'+
          '<option value="St Spyridon Church      Palos Heights, IL      60463-1855">St Spyridon Church      Palos Heights, IL      60463-1855</option>'+
          '<option value="St Spyridon Church      San Diego, CA      92103-4546">St Spyridon Church      San Diego, CA      92103-4546</option>'+
          '<option value="St Spyridon Church      Sheboygan, WI      53081-5337">St Spyridon Church      Sheboygan, WI      53081-5337</option>'+
          '<option value="St Spyridon Church      Upland, CA      91785-1327">St Spyridon Church      Upland, CA      91785-1327</option>'+
          '<option value="St Spyridon Greek Orthodox Church      Loveland, CO      80538-2659">St Spyridon Greek Orthodox Church      Loveland, CO      80538-2659</option>'+
          '<option value="St Stefanos Church      St Petersburg, FL      33710-1262">St Stefanos Church      St Petersburg, FL      33710-1262</option>'+
          '<option value="St Theodore Church      Lanham, MD      20706-3808">St Theodore Church      Lanham, MD      20706-3808</option>'+
          '<option value="St Thomas Church      Cherry Hill, NJ      08002-2635">St Thomas Church      Cherry Hill, NJ      08002-2635</option>'+
          '<option value="St Vasilios Church      Newport, NH      03773-0428">St Vasilios Church      Newport, NH      03773-0428</option>'+
          '<option value="St Vasilios Church      Peabody, MA      01960-4496">St Vasilios Church      Peabody, MA      01960-4496</option>'+
          '<option value="St Vasilios Church      Watertown, NY      13601-3406">St Vasilios Church      Watertown, NY      13601-3406</option>'+
          '<option value="Sts. Anargyroi Church      Marlborough, MA      01752-0381">Sts. Anargyroi Church      Marlborough, MA      01752-0381</option>'+
          '<option value="Sts. Anargyroi Church      New York, NY      10040-4505">Sts. Anargyroi Church      New York, NY      10040-4505</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Brooklyn, NY      11201-5005">Sts. Constantine &amp; Helen Cathedral      Brooklyn, NY      11201-5005</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Cleveland, OH      44118-1330">Sts. Constantine &amp; Helen Cathedral      Cleveland, OH      44118-1330</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Honolulu, HI      96822-3562">Sts. Constantine &amp; Helen Cathedral      Honolulu, HI      96822-3562</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Merrillville, IN      46410-5404">Sts. Constantine &amp; Helen Cathedral      Merrillville, IN      46410-5404</option>'+
          '<option value="Sts. Constantine &amp; Helen Cathedral      Richmond, VA      23221-2658">Sts. Constantine &amp; Helen Cathedral      Richmond, VA      23221-2658</option>'+
          '<option value="Sts. Constantine &amp; Helen Chapel      Battle Creek, MI      49016-0189">Sts. Constantine &amp; Helen Chapel      Battle Creek, MI      49016-0189</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Andover, MA      01810-1232">Sts. Constantine &amp; Helen Church      Andover, MA      01810-1232</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Annapolis, MD      21401-7202">Sts. Constantine &amp; Helen Church      Annapolis, MD      21401-7202</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Boise, ID      83702-4705">Sts. Constantine &amp; Helen Church      Boise, ID      83702-4705</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cambridge, MA      02139-3965">Sts. Constantine &amp; Helen Church      Cambridge, MA      02139-3965</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cardiff-By-The-Sea, CA      92007-1525">Sts. Constantine &amp; Helen Church      Cardiff-By-The-Sea, CA      92007-1525</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Cheyenne, WY      82003-0112">Sts. Constantine &amp; Helen Church      Cheyenne, WY      82003-0112</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Chicopee, MA      01021-0112">Sts. Constantine &amp; Helen Church      Chicopee, MA      01021-0112</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Fayetteville, NC      28305-4626">Sts. Constantine &amp; Helen Church      Fayetteville, NC      28305-4626</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Great Falls, MT      59403-2564">Sts. Constantine &amp; Helen Church      Great Falls, MT      59403-2564</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Jackson Hts, NY      11372-6144">Sts. Constantine &amp; Helen Church      Jackson Hts, NY      11372-6144</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Lancaster, CA      93536-5319">Sts. Constantine &amp; Helen Church      Lancaster, CA      93536-5319</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Mansfield, OH      44903-7200">Sts. Constantine &amp; Helen Church      Mansfield, OH      44903-7200</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Middletown, OH      45044-4712">Sts. Constantine &amp; Helen Church      Middletown, OH      45044-4712</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Monroe, LA      71201-3608">Sts. Constantine &amp; Helen Church      Monroe, LA      71201-3608</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Newport News, VA      23606-3507">Sts. Constantine &amp; Helen Church      Newport News, VA      23606-3507</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Palos Hills, IL      60465-2398">Sts. Constantine &amp; Helen Church      Palos Hills, IL      60465-2398</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Reading, PA      19611-1763">Sts. Constantine &amp; Helen Church      Reading, PA      19611-1763</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Rockford, IL      61107-4039">Sts. Constantine &amp; Helen Church      Rockford, IL      61107-4039</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Swansea, IL      62226-1094">Sts. Constantine &amp; Helen Church      Swansea, IL      62226-1094</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Vallejo, CA      94590-4648">Sts. Constantine &amp; Helen Church      Vallejo, CA      94590-4648</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Vandergrift, PA      15690-1209">Sts. Constantine &amp; Helen Church      Vandergrift, PA      15690-1209</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Webster, MA      01570-0713">Sts. Constantine &amp; Helen Church      Webster, MA      01570-0713</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      West Nyack, NY      10994-2426">Sts. Constantine &amp; Helen Church      West Nyack, NY      10994-2426</option>'+
          '<option value="Sts. Constantine &amp; Helen Church      Westland, MI      48185-0032">Sts. Constantine &amp; Helen Church      Westland, MI      48185-0032</option>'+
          '<option value="Sts. Constantine &amp; Helen of Washington Dc      Silver Spring, MD      20905-3801">Sts. Constantine &amp; Helen of Washington Dc      Silver Spring, MD      20905-3801</option>'+
          '<option value="Sts. Constantine and Helen Church      Wauwatosa, WI      53213-1743">Sts. Constantine and Helen Church      Wauwatosa, WI      53213-1743</option>'+
          '<option value="Sts. Markella &amp; Demetrios Church      Ft Walton Beach, FL      32549-2135">Sts. Markella &amp; Demetrios Church      Ft Walton Beach, FL      32549-2135</option>'+
          '<option value="Sts. Markella &amp; Demetrios Church      Mary Esther, FL      32569">Sts. Markella &amp; Demetrios Church      Mary Esther, FL      32569</option>'+
          '<option value="Sts. Mary Magdalene &amp; Markella Church      Bel Air, MD      21014-7575">Sts. Mary Magdalene &amp; Markella Church      Bel Air, MD      21014-7575</option>'+
          '<option value="Sts. Nicholas Constantine &amp; Helen Church      Roseland, NJ      07068">Sts. Nicholas Constantine &amp; Helen Church      Roseland, NJ      07068</option>'+
          '<option value="Sts. Peter &amp; Paul Church      Boulder, CO      80301-3042">Sts. Peter &amp; Paul Church      Boulder, CO      80301-3042</option>'+
          '<option value="Sts. Peter &amp; Paul Church      Glenview, IL      60025-2305">Sts. Peter &amp; Paul Church      Glenview, IL      60025-2305</option>'+
          '<option value="Sts. Peter and Paul Church      Frederick, MD      21701-8518">Sts. Peter and Paul Church      Frederick, MD      21701-8518</option>'+
          '<option value="Sts. Raphael Nicholas &amp; Irene Mission      Palm Harbor, FL      34683-4919">Sts. Raphael Nicholas &amp; Irene Mission      Palm Harbor, FL      34683-4919</option>'+
          '<option value="Sts. Raphael Nicholas and Irene Church      Cumming, GA      30028-0588">Sts. Raphael Nicholas and Irene Church      Cumming, GA      30028-0588</option>'+
          '<option value="Sts. Theodoroi Church      Gloversville, NY      12078-0009">Sts. Theodoroi Church      Gloversville, NY      12078-0009</option>'+
          '<option value="Taxiarchae Archangels Church      Watertown, MA      02472">Taxiarchae Archangels Church      Watertown, MA      02472</option>'+
          '<option value="Taxiarchai Church      Laconia, NH      03247-0086">Taxiarchai Church      Laconia, NH      03247-0086</option>'+
          '<option value="The Archangel Michael Church      Port Washington, NY      11050-4613">The Archangel Michael Church      Port Washington, NY      11050-4613</option>'+
          '<option value="The Twelve Holy Apostles Church      Duluth, MN      55805-2010">The Twelve Holy Apostles Church      Duluth, MN      55805-2010</option>'+
          '<option value="Three Hierarchs Church      Brooklyn, NY      11229-1206">Three Hierarchs Church      Brooklyn, NY      11229-1206</option>'+
          '<option value="Three Hierarchs Church      Champaign, IL      61820-7232">Three Hierarchs Church      Champaign, IL      61820-7232</option>'+
          '<option value="Transfiguration Church      Austin, TX      78746-3101">Transfiguration Church      Austin, TX      78746-3101</option>'+
          '<option value="Transfiguration Church      Charlottesville, VA      22902-4340">Transfiguration Church      Charlottesville, VA      22902-4340</option>'+
          '<option value="Transfiguration Church      Florence, SC      29501-6327">Transfiguration Church      Florence, SC      29501-6327</option>'+
          '<option value="Transfiguration Church      Franklin, NH      03235-1213">Transfiguration Church      Franklin, NH      03235-1213</option>'+
          '<option value="Transfiguration Church      Ogden, UT      84403-2851">Transfiguration Church      Ogden, UT      84403-2851</option>'+
          '<option value="Transfiguration of Christ Church      Corona, NY      11368">Transfiguration of Christ Church      Corona, NY      11368</option>'+
          '<option value="Transfiguration Of Christ Church      Mattituck, NY      11952-0921">Transfiguration Of Christ Church      Mattituck, NY      11952-0921</option>'+
          '<option value="Transfiguration of our Lord Church      Mason City, IA      50401-1700">Transfiguration of our Lord Church      Mason City, IA      50401-1700</option>'+
          '<option value="Transfiguration of Our Saviour Church      Lowell, MA      01854-3501">Transfiguration of Our Saviour Church      Lowell, MA      01854-3501</option>'+
          '<option value="Zoodochos Peghe Church      Bronx, NY      10461-4605">Zoodochos Peghe Church      Bronx, NY      10461-4605</option>'+
          '<option value="Zoodochos Peghe Church      Hot Springs, AR      71901-6827">Zoodochos Peghe Church      Hot Springs, AR      71901-6827</option>'+
          '<option value="Zoodochos Peghe Church      Martins Ferry, OH      43935-1647">Zoodochos Peghe Church      Martins Ferry, OH      43935-1647</option>'+
          '</select>';
        var tr64 = document.createElement('tr');
        tr64.setAttribute('name', 'tr64'+memNum);
        tr64.setAttribute('id', 'tr64'+memNum);
        mainTableBody.appendChild(tr64);
        tr64.insertCell(0).innerHTML = '<td><span class="titlelbl">Ministries</span></td>';
        formTabIndex = formTabIndex + 1;
        var tr65 = document.createElement('tr');
        tr65.setAttribute('name', 'tr65'+memNum);
        tr65.setAttribute('id', 'tr65'+memNum);
        mainTableBody.appendChild(tr65);
        var td67 = document.createElement('td');
        td67.setAttribute('id', 'td67'+memNum);
        tr65.appendChild(td67);
        td67.innerHTML = 
          '&nbsp;&nbsp;<span class="lbl">Ministry 1</span>';
        var td65 = document.createElement('td');
        td65.setAttribute('id', 'td65'+memNum);
        tr65.appendChild(td65);
        td65.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Min1" id="cboMem'+memNum+'Min1" title="select a ministry pull down list 1 in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Adult Continuous Education">Adult Continuous Education</option>'+
          '<option value="Adult Religious Education">Adult Religious Education</option>'+
          '<option value="Altar Boy">Altar Boy</option>'+
          '<option value="Altar Boy Leader">Altar Boy Leader</option>'+
          '<option value="Altar Boys">Altar Boys</option>'+
          '<option value="Altar Boys / Acolytes">Altar Boys / Acolytes</option>'+
          '<option value="Bake Or Cook For Event(S)">Bake Or Cook For Event(S)</option>'+
          '<option value="Baking Prosfora">Baking Prosfora</option>'+
          '<option value="Bereavement Support Group">Bereavement Support Group</option>'+
          '<option value="Bible Studies">Bible Studies</option>'+
          '<option value="Bible Study">Bible Study</option>'+
          '<option value="Blood Drives">Blood Drives</option>'+
          '<option value="Book Study">Book Study</option>'+
          '<option value="Bookstore">Bookstore</option>'+
          '<option value="Boy Scouts">Boy Scouts</option>'+
          '<option value="Bulletin & Newsletter">Bulletin & Newsletter</option>'+
          '<option value="By-Laws">By-Laws</option>'+
          '<option value="Camp Counselor">Camp Counselor</option>'+
          '<option value="Campus Ministry">Campus Ministry</option>'+
          '<option value="Cathedral Choir">Cathedral Choir</option>'+
          '<option value="Celebrating God\'s Creation">Celebrating God\'s Creation</option>'+
          '<option value="Choir">Choir</option>'+
          '<option value="Choir/Chanter, Adult & Youth">Choir/Chanter, Adult & Youth</option>'+
          '<option value="Church Ministries(Time&Talent)">Church Ministries(Time&Talent)</option>'+
          '<option value="Church School">Church School</option>'+
          '<option value="Church School Administration">Church School Administration</option>'+
          '<option value="Church School Teacher">Church School Teacher</option>'+
          '<option value="Clean-Up">Clean-Up</option>'+
          '<option value="Communication">Communication</option>'+
          '<option value="Computer / Technical">Computer / Technical</option>'+
          '<option value="Couples Ministry">Couples Ministry</option>'+
          '<option value="Data Entry">Data Entry</option>'+
          '<option value="Development / Fundraising">Development / Fundraising</option>'+
          '<option value="Disaster Relief Projects">Disaster Relief Projects</option>'+
          '<option value="Elder/Sick Care">Elder/Sick Care</option>'+
          '<option value="Electrical">Electrical</option>'+
          '<option value="Environmental Projects">Environmental Projects</option>'+
          '<option value="Exterior Repairs">Exterior Repairs</option>'+
          '<option value="Facilities & Maintenance">Facilities & Maintenance</option>'+
          '<option value="Fair Share (Treasure)">Fair Share (Treasure)</option>'+
          '<option value="Feed The Hungry">Feed The Hungry</option>'+
          '<option value="Festival">Festival</option>'+
          '<option value="Fiscal Mgt / Review">Fiscal Mgt / Review</option>'+
          '<option value="Food Pantry">Food Pantry</option>'+
          '<option value="Foundation">Foundation</option>'+
          '<option value="Fundraiser - Journal">Fundraiser - Journal</option>'+
          '<option value="Fundraiser - Raffle">Fundraiser - Raffle</option>'+
          '<option value="Garden & Landscape">Garden & Landscape</option>'+
          '<option value="Girl Scouts">Girl Scouts</option>'+
          '<option value="Goya">Goya</option>'+
          '<option value="Goya (adult)">Goya (adult)</option>'+
          '<option value="Goya (parent)">Goya (parent)</option>'+
          '<option value="Goya Youth Leader">Goya Youth Leader</option>'+
          '<option value="Greek Dance">Greek Dance</option>'+
          '<option value="Greek Dance Teacher Assistant">Greek Dance Teacher Assistant</option>'+
          '<option value="Greek Festival">Greek Festival</option>'+
          '<option value="Greek School">Greek School</option>'+
          '<option value="Greek School Board">Greek School Board</option>'+
          '<option value="Greek School Principal">Greek School Principal</option>'+
          '<option value="Greek School Pta">Greek School Pta</option>'+
          '<option value="Greeter / Usher">Greeter / Usher</option>'+
          '<option value="Greeters/Diakonia">Greeters/Diakonia</option>'+
          '<option value="Grief Bereavement Group">Grief Bereavement Group</option>'+
          '<option value="Hall Rentals">Hall Rentals</option>'+
          '<option value="Hope">Hope</option>'+
          '<option value="Hope Youth Leader">Hope Youth Leader</option>'+
          '<option value="Interior Repairs">Interior Repairs</option>'+
          '<option value="Int\'L Orth Christian Charities">Int\'L Orth Christian Charities</option>'+
          '<option value="Intro To Orthodoxy">Intro To Orthodoxy</option>'+
          '<option value="Joy">Joy</option>'+
          '<option value="Joy Youth Leader">Joy Youth Leader</option>'+
          '<option value="Junior GOYA">Junior GOYA</option>'+
          '<option value="Library">Library</option>'+
          '<option value="Little Angels">Little Angels</option>'+
          '<option value="Little Angels Youth Leader">Little Angels Youth Leader</option>'+
          '<option value="Little Lambs">Little Lambs</option>'+
          '<option value="Maintenance, Gardens">Maintenance, Gardens</option>'+
          '<option value="Member/Outreach (T&T)">Member/Outreach (T&T)</option>'+
          '<option value="Military Ministry">Military Ministry</option>'+
          '<option value="Missions">Missions</option>'+
          '<option value="National Ministries (T&T)">National Ministries (T&T)</option>'+
          '<option value="New Member Events">New Member Events</option>'+
          '<option value="Newsletter Support">Newsletter Support</option>'+
          '<option value="Ocmc Mission Center">Ocmc Mission Center</option>'+
          '<option value="Offering Bread (Prosfora)">Offering Bread (Prosfora)</option>'+
          '<option value="Office And Library Support">Office And Library Support</option>'+
          '<option value="Office Help">Office Help</option>'+
          '<option value="Orthodox Christian Fellowship">Orthodox Christian Fellowship</option>'+
          '<option value="Outreach">Outreach</option>'+
          '<option value="Parish Council">Parish Council</option>'+
          '<option value="Parish Mailings">Parish Mailings</option>'+
          '<option value="Parking For Special Event(S)">Parking For Special Event(S)</option>'+
          '<option value="Philoptochos">Philoptochos</option>'+
          '<option value="Philoptochos Coffee Hour Host">Philoptochos Coffee Hour Host</option>'+
          '<option value="Plumbing">Plumbing</option>'+
          '<option value="Priest">Priest</option>'+
          '<option value="Prison Ministry">Prison Ministry</option>'+
          '<option value="Project Mexico">Project Mexico</option>'+
          '<option value="Prosforon & Kolyva Preparation">Prosforon & Kolyva Preparation</option>'+
          '<option value="Public Relations">Public Relations</option>'+
          '<option value="Publications">Publications</option>'+
          '<option value="Reader">Reader</option>'+
          '<option value="Retired Men\'s Group">Retired Men\'s Group</option>'+
          '<option value="Roofing">Roofing</option>'+
          '<option value="Sanctuary & Altar Care">Sanctuary & Altar Care</option>'+
          '<option value="Seniors Club">Seniors Club</option>'+
          '<option value="Seniors Ministry">Seniors Ministry</option>'+
          '<option value="Set Up & Decorate For Event(S)">Set Up & Decorate For Event(S)</option>'+
          '<option value="Sew/Alter Altar Boy Robes">Sew/Alter Altar Boy Robes</option>'+
          '<option value="Sigma Epsilon Phi">Sigma Epsilon Phi</option>'+
          '<option value="Singles Ministry">Singles Ministry</option>'+
          '<option value="Speakers">Speakers</option>'+
          '<option value="Spiritual Renewal">Spiritual Renewal</option>'+
          '<option value="St. Matrona">St. Matrona</option>'+
          '<option value="St. Tabitha">St. Tabitha</option>'+
          '<option value="Stewardship">Stewardship</option>'+
          '<option value="Sunday Fellowship / Coffee">Sunday Fellowship / Coffee</option>'+
          '<option value="Sunday School">Sunday School</option>'+
          '<option value="Sunday School Director">Sunday School Director</option>'+
          '<option value="Sunday School Teacher">Sunday School Teacher</option>'+
          '<option value="Sunday School Teacher, Asst.">Sunday School Teacher, Asst.</option>'+
          '<option value="Usher">Usher</option>'+
          '<option value="Vacation Church School">Vacation Church School</option>'+
          '<option value="Veterans Ministry">Veterans Ministry</option>'+
          '<option value="Visitation - Hospital">Visitation - Hospital</option>'+
          '<option value="Visitation - Shut-Ins">Visitation - Shut-Ins</option>'+
          '<option value="Web Site & E-Mail">Web Site & E-Mail</option>'+
          '<option value="Website Support">Website Support</option>'+
          '<option value="Welcome Team">Welcome Team</option>'+
          '<option value="Yal Advisor">Yal Advisor</option>'+
          '<option value="Young Professionals">Young Professionals</option>'+
          '<option value="Youth Leader">Youth Leader</option>'+
          '<option value="Youth Pro. Scouts">Youth Pro. Scouts</option>'+
          '<option value="Youth Program">Youth Program</option>'+
          '</select>';
        var td68 = document.createElement('td');
        td68.setAttribute('id', 'td68'+memNum);
        tr65.appendChild(td68);
        td68.innerHTML = 
          '<span class="lbl">Interested in Joining</span>';
        var td66 = document.createElement('td');
        td66.setAttribute('id', 'td66'+memNum);
        td66.setAttribute('colspan', '2');
        tr65.appendChild(td66);
        td66.innerHTML = 
          '<select tabindex="'+(formTabIndex+1)+'" name="cboMem'+memNum+'Min1Type" id="cboMem'+memNum+'Min1Type" title="Select an interest in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Actively Involved">Actively Involved</option>'+
          '<option value="Chairperson">Chairperson</option>'+
          '<option value="Co-Chair">Co-Chair</option>'+
          '<option value="Interested">Interested</option>'+
          '<option value="No Longer Involved">No Longer Involved</option>'+
          '<option value="Volunteered">Volunteered</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr66 = document.createElement('tr');
        tr66.setAttribute('name', 'tr66'+memNum);
        tr66.setAttribute('id', 'tr66'+memNum);
        mainTableBody.appendChild(tr66);
        var td68 = document.createElement('td');
        td68.setAttribute('id', 'td68'+memNum);
        tr66.appendChild(td68);
        td68.innerHTML = 
          '&nbsp;&nbsp;<span class="lbl">Ministry 2</span>';
        var td66 = document.createElement('td');
        td66.setAttribute('id', 'td66'+memNum);
        tr66.appendChild(td66);
        td66.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Min2" id="cboMem'+memNum+'Min2" title="select a ministry pull down list 2 in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Adult Continuous Education">Adult Continuous Education</option>'+
          '<option value="Adult Religious Education">Adult Religious Education</option>'+
          '<option value="Altar Boy">Altar Boy</option>'+
          '<option value="Altar Boy Leader">Altar Boy Leader</option>'+
          '<option value="Altar Boys">Altar Boys</option>'+
          '<option value="Altar Boys / Acolytes">Altar Boys / Acolytes</option>'+
          '<option value="Bake Or Cook For Event(S)">Bake Or Cook For Event(S)</option>'+
          '<option value="Baking Prosfora">Baking Prosfora</option>'+
          '<option value="Bereavement Support Group">Bereavement Support Group</option>'+
          '<option value="Bible Studies">Bible Studies</option>'+
          '<option value="Bible Study">Bible Study</option>'+
          '<option value="Blood Drives">Blood Drives</option>'+
          '<option value="Book Study">Book Study</option>'+
          '<option value="Bookstore">Bookstore</option>'+
          '<option value="Boy Scouts">Boy Scouts</option>'+
          '<option value="Bulletin & Newsletter">Bulletin & Newsletter</option>'+
          '<option value="By-Laws">By-Laws</option>'+
          '<option value="Camp Counselor">Camp Counselor</option>'+
          '<option value="Campus Ministry">Campus Ministry</option>'+
          '<option value="Cathedral Choir">Cathedral Choir</option>'+
          '<option value="Celebrating God\'s Creation">Celebrating God\'s Creation</option>'+
          '<option value="Choir">Choir</option>'+
          '<option value="Choir/Chanter, Adult & Youth">Choir/Chanter, Adult & Youth</option>'+
          '<option value="Church Ministries(Time&Talent)">Church Ministries(Time&Talent)</option>'+
          '<option value="Church School">Church School</option>'+
          '<option value="Church School Administration">Church School Administration</option>'+
          '<option value="Church School Teacher">Church School Teacher</option>'+
          '<option value="Clean-Up">Clean-Up</option>'+
          '<option value="Communication">Communication</option>'+
          '<option value="Computer / Technical">Computer / Technical</option>'+
          '<option value="Couples Ministry">Couples Ministry</option>'+
          '<option value="Data Entry">Data Entry</option>'+
          '<option value="Development / Fundraising">Development / Fundraising</option>'+
          '<option value="Disaster Relief Projects">Disaster Relief Projects</option>'+
          '<option value="Elder/Sick Care">Elder/Sick Care</option>'+
          '<option value="Electrical">Electrical</option>'+
          '<option value="Environmental Projects">Environmental Projects</option>'+
          '<option value="Exterior Repairs">Exterior Repairs</option>'+
          '<option value="Facilities & Maintenance">Facilities & Maintenance</option>'+
          '<option value="Fair Share (Treasure)">Fair Share (Treasure)</option>'+
          '<option value="Feed The Hungry">Feed The Hungry</option>'+
          '<option value="Festival">Festival</option>'+
          '<option value="Fiscal Mgt / Review">Fiscal Mgt / Review</option>'+
          '<option value="Food Pantry">Food Pantry</option>'+
          '<option value="Foundation">Foundation</option>'+
          '<option value="Fundraiser - Journal">Fundraiser - Journal</option>'+
          '<option value="Fundraiser - Raffle">Fundraiser - Raffle</option>'+
          '<option value="Garden & Landscape">Garden & Landscape</option>'+
          '<option value="Girl Scouts">Girl Scouts</option>'+
          '<option value="Goya">Goya</option>'+
          '<option value="Goya (adult)">Goya (adult)</option>'+
          '<option value="Goya (parent)">Goya (parent)</option>'+
          '<option value="Goya Youth Leader">Goya Youth Leader</option>'+
          '<option value="Greek Dance">Greek Dance</option>'+
          '<option value="Greek Dance Teacher Assistant">Greek Dance Teacher Assistant</option>'+
          '<option value="Greek Festival">Greek Festival</option>'+
          '<option value="Greek School">Greek School</option>'+
          '<option value="Greek School Board">Greek School Board</option>'+
          '<option value="Greek School Principal">Greek School Principal</option>'+
          '<option value="Greek School Pta">Greek School Pta</option>'+
          '<option value="Greeter / Usher">Greeter / Usher</option>'+
          '<option value="Greeters/Diakonia">Greeters/Diakonia</option>'+
          '<option value="Grief Bereavement Group">Grief Bereavement Group</option>'+
          '<option value="Hall Rentals">Hall Rentals</option>'+
          '<option value="Hope">Hope</option>'+
          '<option value="Hope Youth Leader">Hope Youth Leader</option>'+
          '<option value="Interior Repairs">Interior Repairs</option>'+
          '<option value="Int\'L Orth Christian Charities">Int\'L Orth Christian Charities</option>'+
          '<option value="Intro To Orthodoxy">Intro To Orthodoxy</option>'+
          '<option value="Joy">Joy</option>'+
          '<option value="Joy Youth Leader">Joy Youth Leader</option>'+
          '<option value="Junior GOYA">Junior GOYA</option>'+
          '<option value="Library">Library</option>'+
          '<option value="Little Angels">Little Angels</option>'+
          '<option value="Little Angels Youth Leader">Little Angels Youth Leader</option>'+
          '<option value="Little Lambs">Little Lambs</option>'+
          '<option value="Maintenance, Gardens">Maintenance, Gardens</option>'+
          '<option value="Member/Outreach (T&T)">Member/Outreach (T&T)</option>'+
          '<option value="Military Ministry">Military Ministry</option>'+
          '<option value="Missions">Missions</option>'+
          '<option value="National Ministries (T&T)">National Ministries (T&T)</option>'+
          '<option value="New Member Events">New Member Events</option>'+
          '<option value="Newsletter Support">Newsletter Support</option>'+
          '<option value="Ocmc Mission Center">Ocmc Mission Center</option>'+
          '<option value="Offering Bread (Prosfora)">Offering Bread (Prosfora)</option>'+
          '<option value="Office And Library Support">Office And Library Support</option>'+
          '<option value="Office Help">Office Help</option>'+
          '<option value="Orthodox Christian Fellowship">Orthodox Christian Fellowship</option>'+
          '<option value="Outreach">Outreach</option>'+
          '<option value="Parish Council">Parish Council</option>'+
          '<option value="Parish Mailings">Parish Mailings</option>'+
          '<option value="Parking For Special Event(S)">Parking For Special Event(S)</option>'+
          '<option value="Philoptochos">Philoptochos</option>'+
          '<option value="Philoptochos Coffee Hour Host">Philoptochos Coffee Hour Host</option>'+
          '<option value="Plumbing">Plumbing</option>'+
          '<option value="Priest">Priest</option>'+
          '<option value="Prison Ministry">Prison Ministry</option>'+
          '<option value="Project Mexico">Project Mexico</option>'+
          '<option value="Prosforon & Kolyva Preparation">Prosforon & Kolyva Preparation</option>'+
          '<option value="Public Relations">Public Relations</option>'+
          '<option value="Publications">Publications</option>'+
          '<option value="Reader">Reader</option>'+
          '<option value="Retired Men\'s Group">Retired Men\'s Group</option>'+
          '<option value="Roofing">Roofing</option>'+
          '<option value="Sanctuary & Altar Care">Sanctuary & Altar Care</option>'+
          '<option value="Seniors Club">Seniors Club</option>'+
          '<option value="Seniors Ministry">Seniors Ministry</option>'+
          '<option value="Set Up & Decorate For Event(S)">Set Up & Decorate For Event(S)</option>'+
          '<option value="Sew/Alter Altar Boy Robes">Sew/Alter Altar Boy Robes</option>'+
          '<option value="Sigma Epsilon Phi">Sigma Epsilon Phi</option>'+
          '<option value="Singles Ministry">Singles Ministry</option>'+
          '<option value="Speakers">Speakers</option>'+
          '<option value="Spiritual Renewal">Spiritual Renewal</option>'+
          '<option value="St. Matrona">St. Matrona</option>'+
          '<option value="St. Tabitha">St. Tabitha</option>'+
          '<option value="Stewardship">Stewardship</option>'+
          '<option value="Sunday Fellowship / Coffee">Sunday Fellowship / Coffee</option>'+
          '<option value="Sunday School">Sunday School</option>'+
          '<option value="Sunday School Director">Sunday School Director</option>'+
          '<option value="Sunday School Teacher">Sunday School Teacher</option>'+
          '<option value="Sunday School Teacher, Asst.">Sunday School Teacher, Asst.</option>'+
          '<option value="Usher">Usher</option>'+
          '<option value="Vacation Church School">Vacation Church School</option>'+
          '<option value="Veterans Ministry">Veterans Ministry</option>'+
          '<option value="Visitation - Hospital">Visitation - Hospital</option>'+
          '<option value="Visitation - Shut-Ins">Visitation - Shut-Ins</option>'+
          '<option value="Web Site & E-Mail">Web Site & E-Mail</option>'+
          '<option value="Website Support">Website Support</option>'+
          '<option value="Welcome Team">Welcome Team</option>'+
          '<option value="Yal Advisor">Yal Advisor</option>'+
          '<option value="Young Professionals">Young Professionals</option>'+
          '<option value="Youth Leader">Youth Leader</option>'+
          '<option value="Youth Pro. Scouts">Youth Pro. Scouts</option>'+
          '<option value="Youth Program">Youth Program</option>'+
          '</select>';
        var td69 = document.createElement('td');
        td69.setAttribute('id', 'td69'+memNum);
        tr66.appendChild(td69);
        td69.innerHTML = 
          '<span class="lbl">Interested in Joining</span>';
        var td67 = document.createElement('td');
        td67.setAttribute('id', 'td67'+memNum);
        td67.setAttribute('colspan', '2');
        tr66.appendChild(td67);
        td67.innerHTML = 
          '<select tabindex="'+(formTabIndex+1)+'" name="cboMem'+memNum+'Min2Type" id="cboMem'+memNum+'Min2Type" title="Select an interest in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Actively Involved">Actively Involved</option>'+
          '<option value="Chairperson">Chairperson</option>'+
          '<option value="Co-Chair">Co-Chair</option>'+
          '<option value="Interested">Interested</option>'+
          '<option value="No Longer Involved">No Longer Involved</option>'+
          '<option value="Volunteered">Volunteered</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr67 = document.createElement('tr');
        tr67.setAttribute('name', 'tr67'+memNum);
        tr67.setAttribute('id', 'tr67'+memNum);
        mainTableBody.appendChild(tr67);
        var td69 = document.createElement('td');
        td69.setAttribute('id', 'td69'+memNum);
        tr67.appendChild(td69);
        td69.innerHTML = 
          '&nbsp;&nbsp;<span class="lbl">Ministry 3</span>';
        var td67 = document.createElement('td');
        td67.setAttribute('id', 'td67'+memNum);
        tr67.appendChild(td67);
        td67.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Min3" id="cboMem'+memNum+'Min3" title="select a ministry pull down list 3 in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Adult Continuous Education">Adult Continuous Education</option>'+
          '<option value="Adult Religious Education">Adult Religious Education</option>'+
          '<option value="Altar Boy">Altar Boy</option>'+
          '<option value="Altar Boy Leader">Altar Boy Leader</option>'+
          '<option value="Altar Boys">Altar Boys</option>'+
          '<option value="Altar Boys / Acolytes">Altar Boys / Acolytes</option>'+
          '<option value="Bake Or Cook For Event(S)">Bake Or Cook For Event(S)</option>'+
          '<option value="Baking Prosfora">Baking Prosfora</option>'+
          '<option value="Bereavement Support Group">Bereavement Support Group</option>'+
          '<option value="Bible Studies">Bible Studies</option>'+
          '<option value="Bible Study">Bible Study</option>'+
          '<option value="Blood Drives">Blood Drives</option>'+
          '<option value="Book Study">Book Study</option>'+
          '<option value="Bookstore">Bookstore</option>'+
          '<option value="Boy Scouts">Boy Scouts</option>'+
          '<option value="Bulletin & Newsletter">Bulletin & Newsletter</option>'+
          '<option value="By-Laws">By-Laws</option>'+
          '<option value="Camp Counselor">Camp Counselor</option>'+
          '<option value="Campus Ministry">Campus Ministry</option>'+
          '<option value="Cathedral Choir">Cathedral Choir</option>'+
          '<option value="Celebrating God\'s Creation">Celebrating God\'s Creation</option>'+
          '<option value="Choir">Choir</option>'+
          '<option value="Choir/Chanter, Adult & Youth">Choir/Chanter, Adult & Youth</option>'+
          '<option value="Church Ministries(Time&Talent)">Church Ministries(Time&Talent)</option>'+
          '<option value="Church School">Church School</option>'+
          '<option value="Church School Administration">Church School Administration</option>'+
          '<option value="Church School Teacher">Church School Teacher</option>'+
          '<option value="Clean-Up">Clean-Up</option>'+
          '<option value="Communication">Communication</option>'+
          '<option value="Computer / Technical">Computer / Technical</option>'+
          '<option value="Couples Ministry">Couples Ministry</option>'+
          '<option value="Data Entry">Data Entry</option>'+
          '<option value="Development / Fundraising">Development / Fundraising</option>'+
          '<option value="Disaster Relief Projects">Disaster Relief Projects</option>'+
          '<option value="Elder/Sick Care">Elder/Sick Care</option>'+
          '<option value="Electrical">Electrical</option>'+
          '<option value="Environmental Projects">Environmental Projects</option>'+
          '<option value="Exterior Repairs">Exterior Repairs</option>'+
          '<option value="Facilities & Maintenance">Facilities & Maintenance</option>'+
          '<option value="Fair Share (Treasure)">Fair Share (Treasure)</option>'+
          '<option value="Feed The Hungry">Feed The Hungry</option>'+
          '<option value="Festival">Festival</option>'+
          '<option value="Fiscal Mgt / Review">Fiscal Mgt / Review</option>'+
          '<option value="Food Pantry">Food Pantry</option>'+
          '<option value="Foundation">Foundation</option>'+
          '<option value="Fundraiser - Journal">Fundraiser - Journal</option>'+
          '<option value="Fundraiser - Raffle">Fundraiser - Raffle</option>'+
          '<option value="Garden & Landscape">Garden & Landscape</option>'+
          '<option value="Girl Scouts">Girl Scouts</option>'+
          '<option value="Goya">Goya</option>'+
          '<option value="Goya (adult)">Goya (adult)</option>'+
          '<option value="Goya (parent)">Goya (parent)</option>'+
          '<option value="Goya Youth Leader">Goya Youth Leader</option>'+
          '<option value="Greek Dance">Greek Dance</option>'+
          '<option value="Greek Dance Teacher Assistant">Greek Dance Teacher Assistant</option>'+
          '<option value="Greek Festival">Greek Festival</option>'+
          '<option value="Greek School">Greek School</option>'+
          '<option value="Greek School Board">Greek School Board</option>'+
          '<option value="Greek School Principal">Greek School Principal</option>'+
          '<option value="Greek School Pta">Greek School Pta</option>'+
          '<option value="Greeter / Usher">Greeter / Usher</option>'+
          '<option value="Greeters/Diakonia">Greeters/Diakonia</option>'+
          '<option value="Grief Bereavement Group">Grief Bereavement Group</option>'+
          '<option value="Hall Rentals">Hall Rentals</option>'+
          '<option value="Hope">Hope</option>'+
          '<option value="Hope Youth Leader">Hope Youth Leader</option>'+
          '<option value="Interior Repairs">Interior Repairs</option>'+
          '<option value="Int\'L Orth Christian Charities">Int\'L Orth Christian Charities</option>'+
          '<option value="Intro To Orthodoxy">Intro To Orthodoxy</option>'+
          '<option value="Joy">Joy</option>'+
          '<option value="Joy Youth Leader">Joy Youth Leader</option>'+
          '<option value="Junior GOYA">Junior GOYA</option>'+
          '<option value="Library">Library</option>'+
          '<option value="Little Angels">Little Angels</option>'+
          '<option value="Little Angels Youth Leader">Little Angels Youth Leader</option>'+
          '<option value="Little Lambs">Little Lambs</option>'+
          '<option value="Maintenance, Gardens">Maintenance, Gardens</option>'+
          '<option value="Member/Outreach (T&T)">Member/Outreach (T&T)</option>'+
          '<option value="Military Ministry">Military Ministry</option>'+
          '<option value="Missions">Missions</option>'+
          '<option value="National Ministries (T&T)">National Ministries (T&T)</option>'+
          '<option value="New Member Events">New Member Events</option>'+
          '<option value="Newsletter Support">Newsletter Support</option>'+
          '<option value="Ocmc Mission Center">Ocmc Mission Center</option>'+
          '<option value="Offering Bread (Prosfora)">Offering Bread (Prosfora)</option>'+
          '<option value="Office And Library Support">Office And Library Support</option>'+
          '<option value="Office Help">Office Help</option>'+
          '<option value="Orthodox Christian Fellowship">Orthodox Christian Fellowship</option>'+
          '<option value="Outreach">Outreach</option>'+
          '<option value="Parish Council">Parish Council</option>'+
          '<option value="Parish Mailings">Parish Mailings</option>'+
          '<option value="Parking For Special Event(S)">Parking For Special Event(S)</option>'+
          '<option value="Philoptochos">Philoptochos</option>'+
          '<option value="Philoptochos Coffee Hour Host">Philoptochos Coffee Hour Host</option>'+
          '<option value="Plumbing">Plumbing</option>'+
          '<option value="Priest">Priest</option>'+
          '<option value="Prison Ministry">Prison Ministry</option>'+
          '<option value="Project Mexico">Project Mexico</option>'+
          '<option value="Prosforon & Kolyva Preparation">Prosforon & Kolyva Preparation</option>'+
          '<option value="Public Relations">Public Relations</option>'+
          '<option value="Publications">Publications</option>'+
          '<option value="Reader">Reader</option>'+
          '<option value="Retired Men\'s Group">Retired Men\'s Group</option>'+
          '<option value="Roofing">Roofing</option>'+
          '<option value="Sanctuary & Altar Care">Sanctuary & Altar Care</option>'+
          '<option value="Seniors Club">Seniors Club</option>'+
          '<option value="Seniors Ministry">Seniors Ministry</option>'+
          '<option value="Set Up & Decorate For Event(S)">Set Up & Decorate For Event(S)</option>'+
          '<option value="Sew/Alter Altar Boy Robes">Sew/Alter Altar Boy Robes</option>'+
          '<option value="Sigma Epsilon Phi">Sigma Epsilon Phi</option>'+
          '<option value="Singles Ministry">Singles Ministry</option>'+
          '<option value="Speakers">Speakers</option>'+
          '<option value="Spiritual Renewal">Spiritual Renewal</option>'+
          '<option value="St. Matrona">St. Matrona</option>'+
          '<option value="St. Tabitha">St. Tabitha</option>'+
          '<option value="Stewardship">Stewardship</option>'+
          '<option value="Sunday Fellowship / Coffee">Sunday Fellowship / Coffee</option>'+
          '<option value="Sunday School">Sunday School</option>'+
          '<option value="Sunday School Director">Sunday School Director</option>'+
          '<option value="Sunday School Teacher">Sunday School Teacher</option>'+
          '<option value="Sunday School Teacher, Asst.">Sunday School Teacher, Asst.</option>'+
          '<option value="Usher">Usher</option>'+
          '<option value="Vacation Church School">Vacation Church School</option>'+
          '<option value="Veterans Ministry">Veterans Ministry</option>'+
          '<option value="Visitation - Hospital">Visitation - Hospital</option>'+
          '<option value="Visitation - Shut-Ins">Visitation - Shut-Ins</option>'+
          '<option value="Web Site & E-Mail">Web Site & E-Mail</option>'+
          '<option value="Website Support">Website Support</option>'+
          '<option value="Welcome Team">Welcome Team</option>'+
          '<option value="Yal Advisor">Yal Advisor</option>'+
          '<option value="Young Professionals">Young Professionals</option>'+
          '<option value="Youth Leader">Youth Leader</option>'+
          '<option value="Youth Pro. Scouts">Youth Pro. Scouts</option>'+
          '<option value="Youth Program">Youth Program</option>'+
          '</select>';
        var td70 = document.createElement('td');
        td70.setAttribute('id', 'td70'+memNum);
        tr67.appendChild(td70);
        td70.innerHTML = 
          '<span class="lbl">Interested in Joining</span>';
        var td68 = document.createElement('td');
        td68.setAttribute('id', 'td68'+memNum);
        td68.setAttribute('colspan', '2');
        tr67.appendChild(td68);
        td68.innerHTML = 
          '<select tabindex="'+(formTabIndex+1)+'" name="cboMem'+memNum+'Min3Type" id="cboMem'+memNum+'Min3Type" title="Select an interest in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Actively Involved">Actively Involved</option>'+
          '<option value="Chairperson">Chairperson</option>'+
          '<option value="Co-Chair">Co-Chair</option>'+
          '<option value="Interested">Interested</option>'+
          '<option value="No Longer Involved">No Longer Involved</option>'+
          '<option value="Volunteered">Volunteered</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr68 = document.createElement('tr');
        tr68.setAttribute('name', 'tr68'+memNum);
        tr68.setAttribute('id', 'tr68'+memNum);
        mainTableBody.appendChild(tr68);
        tr68.insertCell(0).innerHTML = '<td><span class="titlelbl">Talents</span></td>';
        formTabIndex = formTabIndex + 1;
        var tr69 = document.createElement('tr');
        tr69.setAttribute('name', 'tr69'+memNum);
        tr69.setAttribute('id', 'tr69'+memNum);
        mainTableBody.appendChild(tr69);
        var td71 = document.createElement('td');
        td71.setAttribute('id', 'td71'+memNum);
        tr69.appendChild(td71);
        td71.innerHTML = 
          '&nbsp;&nbsp;<span class="lbl">Talent 1</span>';
        var td69 = document.createElement('td');
        td69.setAttribute('id', 'td69'+memNum);
        tr69.appendChild(td69);
        td69.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Tal1" id="cboMem'+memNum+'Tal1" title="select a talent pull down list 1 in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Accounting/Bookkeeping">Accounting/Bookkeeping</option>'+
          '<option value="Administrator">Administrator</option>'+
          '<option value="Air Conditioning">Air Conditioning</option>'+
          '<option value="Attorney">Attorney</option>'+
          '<option value="Auto Body/Painting">Auto Body/Painting</option>'+
          '<option value="Auto Mechanic">Auto Mechanic</option>'+
          '<option value="Baker">Baker</option>'+
          '<option value="Banking">Banking</option>'+
          '<option value="Barber">Barber</option>'+
          '<option value="Bartender">Bartender</option>'+
          '<option value="Beautician">Beautician</option>'+
          '<option value="Bricklayer">Bricklayer</option>'+
          '<option value="Bus Driver">Bus Driver</option>'+
          '<option value="Business Manager">Business Manager</option>'+
          '<option value="Butcher">Butcher</option>'+
          '<option value="Buyer">Buyer</option>'+
          '<option value="Carpenter">Carpenter</option>'+
          '<option value="Clerical/Secretary">Clerical/Secretary</option>'+
          '<option value="College Professor">College Professor</option>'+
          '<option value="Computer / Technical Support">Computer / Technical Support</option>'+
          '<option value="Construction">Construction</option>'+
          '<option value="Dentist">Dentist</option>'+
          '<option value="Doctor">Doctor</option>'+
          '<option value="Educator">Educator</option>'+
          '<option value="Electrician">Electrician</option>'+
          '<option value="Financial Analyst">Financial Analyst</option>'+
          '<option value="Financial Services">Financial Services</option>'+
          '<option value="Florist">Florist</option>'+
          '<option value="Homemaker">Homemaker</option>'+
          '<option value="Insurance">Insurance</option>'+
          '<option value="Interior Design">Interior Design</option>'+
          '<option value="Journalist">Journalist</option>'+
          '<option value="Laborer">Laborer</option>'+
          '<option value="Law Enforcement">Law Enforcement</option>'+
          '<option value="Legal Secretary">Legal Secretary</option>'+
          '<option value="Mechanic">Mechanic</option>'+
          '<option value="Military">Military</option>'+
          '<option value="Nurse">Nurse</option>'+
          '<option value="Office Manager">Office Manager</option>'+
          '<option value="Receptionist">Receptionist</option>'+
          '<option value="Restauranteur">Restauranteur</option>'+
          '<option value="Retired">Retired</option>'+
          '<option value="Sales">Sales</option>'+
          '<option value="Self Employed">Self Employed</option>'+
          '<option value="Software Engineer">Software Engineer</option>'+
          '<option value="Student">Student</option>'+
          '<option value="Teacher">Teacher</option>'+
          '<option value="Teacher\'s Aide">Teacher\'s Aide</option>'+
          '<option value="Technician">Technician</option>'+
          '<option value="Truck Driver">Truck Driver</option>'+
          '<option value="Unemployed">Unemployed</option>'+
          '</select>';
        var td72 = document.createElement('td');
        td72.setAttribute('id', 'td72'+memNum);
        tr69.appendChild(td72);
        td72.innerHTML = 
          '<span class="lbl">Interested in Joining</span>';
        var td70 = document.createElement('td');
        td70.setAttribute('id', 'td70'+memNum);
        tr69.appendChild(td70);
        td70.innerHTML = 
          '<select tabindex="'+(formTabIndex+1)+'" name="cboMem'+memNum+'Tal1Type" id="cboMem'+memNum+'Tal1Type" title="Select an interest in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Actively Involved">Actively Involved</option>'+
          '<option value="Chairperson">Chairperson</option>'+
          '<option value="Co-Chair">Co-Chair</option>'+
          '<option value="Interested">Interested</option>'+
          '<option value="No Longer Involved">No Longer Involved</option>'+
          '<option value="Volunteered">Volunteered</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        formTabIndex = formTabIndex + 1;
        var tr70 = document.createElement('tr');
        tr70.setAttribute('name', 'tr70'+memNum);
        tr70.setAttribute('id', 'tr70'+memNum);
        mainTableBody.appendChild(tr70);
        var td72 = document.createElement('td');
        td72.setAttribute('id', 'td72'+memNum);
        tr70.appendChild(td72);
        td72.innerHTML = 
          '&nbsp;&nbsp;<span class="lbl">Talent 2</span>';
        var td70 = document.createElement('td');
        td70.setAttribute('id', 'td70'+memNum);
        tr70.appendChild(td70);
        td70.innerHTML = 
          '<select tabindex="'+formTabIndex+'" name="cboMem'+memNum+'Tal2" id="cboMem'+memNum+'Tal2" title="select a talent pull down list 2 in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Accounting/Bookkeeping">Accounting/Bookkeeping</option>'+
          '<option value="Administrator">Administrator</option>'+
          '<option value="Air Conditioning">Air Conditioning</option>'+
          '<option value="Attorney">Attorney</option>'+
          '<option value="Auto Body/Painting">Auto Body/Painting</option>'+
          '<option value="Auto Mechanic">Auto Mechanic</option>'+
          '<option value="Baker">Baker</option>'+
          '<option value="Banking">Banking</option>'+
          '<option value="Barber">Barber</option>'+
          '<option value="Bartender">Bartender</option>'+
          '<option value="Beautician">Beautician</option>'+
          '<option value="Bricklayer">Bricklayer</option>'+
          '<option value="Bus Driver">Bus Driver</option>'+
          '<option value="Business Manager">Business Manager</option>'+
          '<option value="Butcher">Butcher</option>'+
          '<option value="Buyer">Buyer</option>'+
          '<option value="Carpenter">Carpenter</option>'+
          '<option value="Clerical/Secretary">Clerical/Secretary</option>'+
          '<option value="College Professor">College Professor</option>'+
          '<option value="Computer / Technical Support">Computer / Technical Support</option>'+
          '<option value="Construction">Construction</option>'+
          '<option value="Dentist">Dentist</option>'+
          '<option value="Doctor">Doctor</option>'+
          '<option value="Educator">Educator</option>'+
          '<option value="Electrician">Electrician</option>'+
          '<option value="Financial Analyst">Financial Analyst</option>'+
          '<option value="Financial Services">Financial Services</option>'+
          '<option value="Florist">Florist</option>'+
          '<option value="Homemaker">Homemaker</option>'+
          '<option value="Insurance">Insurance</option>'+
          '<option value="Interior Design">Interior Design</option>'+
          '<option value="Journalist">Journalist</option>'+
          '<option value="Laborer">Laborer</option>'+
          '<option value="Law Enforcement">Law Enforcement</option>'+
          '<option value="Legal Secretary">Legal Secretary</option>'+
          '<option value="Mechanic">Mechanic</option>'+
          '<option value="Military">Military</option>'+
          '<option value="Nurse">Nurse</option>'+
          '<option value="Office Manager">Office Manager</option>'+
          '<option value="Receptionist">Receptionist</option>'+
          '<option value="Restauranteur">Restauranteur</option>'+
          '<option value="Retired">Retired</option>'+
          '<option value="Sales">Sales</option>'+
          '<option value="Self Employed">Self Employed</option>'+
          '<option value="Software Engineer">Software Engineer</option>'+
          '<option value="Student">Student</option>'+
          '<option value="Teacher">Teacher</option>'+
          '<option value="Teacher\'s Aide">Teacher\'s Aide</option>'+
          '<option value="Technician">Technician</option>'+
          '<option value="Truck Driver">Truck Driver</option>'+
          '<option value="Unemployed">Unemployed</option>'+
          '</select>';
        var td73 = document.createElement('td');
        td73.setAttribute('id', 'td73'+memNum);
        tr70.appendChild(td73);
        td73.innerHTML = 
          '<span class="lbl">Interested in Joining</span>';
        var td71 = document.createElement('td');
        td71.setAttribute('id', 'td71'+memNum);
        tr70.appendChild(td71);
        td71.innerHTML = 
          '<select tabindex="'+(formTabIndex+1)+'" name="cboMem'+memNum+'Tal2Type" id="cboMem'+memNum+'Tal2Type" title="Select an interest in the pull down list" style="width:155px" class="pulldownstyle" >'+
          '<option value=""/>'+
          '<option value="Actively Involved">Actively Involved</option>'+
          '<option value="Chairperson">Chairperson</option>'+
          '<option value="Co-Chair">Co-Chair</option>'+
          '<option value="Interested">Interested</option>'+
          '<option value="No Longer Involved">No Longer Involved</option>'+
          '<option value="Volunteered">Volunteered</option>'+
          '</select>';
        formTabIndex = formTabIndex + 1;
        var tr71 = document.createElement('tr');
        tr71.setAttribute('name', 'tr71'+memNum);
        tr71.setAttribute('id', 'tr71'+memNum);
        mainTableBody.appendChild(tr71);
        tr71.insertCell(0).innerHTML = '<td><span class="titlelbl">Remarks</span></td>';
        var td71 = document.createElement('td');
        td71.setAttribute('id', 'td71'+memNum);
        td71.setAttribute('colspan', '3');
        tr71.appendChild(td71);
        formTabIndex = formTabIndex + 1;
        td71.innerHTML = 
          '<textarea rows="5" tabindex="'+formTabIndex+'" name="txaMem'+memNum+'Remarks" id="txaMem'+memNum+'Remarks" class="txareastyle"></textarea>';
        var tr9999 = document.createElement('tr');
        tr9999.setAttribute('name', 'tr9999'+memNum);
        tr9999.setAttribute('id', 'tr9999'+memNum);
        mainTableBody.appendChild(tr9999);
        var td9999 = document.createElement('td');
        td9999.setAttribute('id', 'td9999'+memNum);
        td9999.setAttribute('colspan', '8');
        tr9999.appendChild(td9999);
        td9999.innerHTML = '<hr>';
        modifyDisplay();
      }
      catch(e)
      {
      	showmodal("", "Information", e);
      }
    }
    function DelNewMem()
    {
      try
      {
      	if (memNum>orgMemNum)
      	{
      	  var table = document.getElementById("mainTable");
      	  var mainTableBody = document.getElementById("mainTbody");
      	  var tr47 = document.getElementById('tr47'+memNum);
      	  mainTableBody.removeChild(tr47);
      	  var tr48 = document.getElementById('tr48'+memNum);
      	  mainTableBody.removeChild(tr48);
      	  var tr49 = document.getElementById('tr49'+memNum);
      	  mainTableBody.removeChild(tr49);
      	  var tr50 = document.getElementById('tr50'+memNum);
      	  mainTableBody.removeChild(tr50);
      	  var tr51 = document.getElementById('tr51'+memNum);
      	  mainTableBody.removeChild(tr51);
      	  var tr52 = document.getElementById('tr52'+memNum);
      	  mainTableBody.removeChild(tr52);
      	  var tr53 = document.getElementById('tr53'+memNum);
      	  mainTableBody.removeChild(tr53);
      	  var tr54 = document.getElementById('tr54'+memNum);
      	  mainTableBody.removeChild(tr54);
      	  var tr55 = document.getElementById('tr55'+memNum);
      	  mainTableBody.removeChild(tr55);
      	  var tr56 = document.getElementById('tr56'+memNum);
      	  mainTableBody.removeChild(tr56);
      	  var tr57 = document.getElementById('tr57'+memNum);
      	  mainTableBody.removeChild(tr57);
      	  var tr58 = document.getElementById('tr58'+memNum);
      	  mainTableBody.removeChild(tr58);
      	  var tr59 = document.getElementById('tr59'+memNum);
      	  mainTableBody.removeChild(tr59);
      	  var tr60 = document.getElementById('tr60'+memNum);
      	  mainTableBody.removeChild(tr60);
      	  var tr61 = document.getElementById('tr61'+memNum);
      	  mainTableBody.removeChild(tr61);
      	  var tr62 = document.getElementById('tr62'+memNum);
      	  mainTableBody.removeChild(tr62);
      	  var tr63 = document.getElementById('tr63'+memNum);
      	  mainTableBody.removeChild(tr63);
      	  var tr64 = document.getElementById('tr64'+memNum);
      	  mainTableBody.removeChild(tr64);
      	  var tr65 = document.getElementById('tr65'+memNum);
      	  mainTableBody.removeChild(tr65);
      	  var tr66 = document.getElementById('tr66'+memNum);
      	  mainTableBody.removeChild(tr66);
      	  var tr67 = document.getElementById('tr67'+memNum);
      	  mainTableBody.removeChild(tr67);
      	  var tr68 = document.getElementById('tr68'+memNum);
      	  mainTableBody.removeChild(tr68);
      	  var tr69 = document.getElementById('tr69'+memNum);
      	  mainTableBody.removeChild(tr69);
      	  var tr70 = document.getElementById('tr70'+memNum);
      	  mainTableBody.removeChild(tr70);
      	  var tr71 = document.getElementById('tr71'+memNum);
      	  mainTableBody.removeChild(tr71);
      	  var tr9999 = document.getElementById('tr9999'+memNum);
      	  var td9999 = document.getElementById('td9999'+memNum);
      	  tr9999.removeChild(td9999);
      	  mainTableBody.removeChild(tr9999);
      	  document.getElementById('btnDelMember').disabled = false;
      	  memNum = memNum-1;
      	  if (memNum <= orgMemNum)
      	  {
      	    memNum = orgMemNum;
      	    document.getElementById('btnDelMember').disabled = true;
      	  }
    	}
      }
      catch(e)
      {
      	showmodal("", "Information", e);
      }
    }
    function toggleMember(num)
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = 'showMember'+num+'Info';
        var MemberBtn = document.getElementById('btnMember'+num+'Btn');
        if ((table.className && table.className.indexOf(showInfo) !== -1) || (MemberBtn.value == "Hide"))
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          document.getElementById('cboMem'+num+'Type').style.display = 'none';
          document.getElementById('labelMem'+num+'Type').style.display = 'none';
          if (MemberBtn)
          {
            MemberBtn.value = "Show";
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (MemberBtn)
          {
            MemberBtn.value = "Hide";
            document.getElementById('cboMem'+num+'Type').style.display = 'inline';
            document.getElementById('labelMem'+num+'Type').style.display = 'inline';
          }
        }
      }
      if (MemberBtn.value == 'Hide')
      {
        document.getElementById('tr48'+num).style.display = '';
        document.getElementById('tr49'+num).style.display = '';
        document.getElementById('tr50'+num).style.display = '';
        document.getElementById('tr51'+num).style.display = '';
        document.getElementById('tr52'+num).style.display = '';
        document.getElementById('tr53'+num).style.display = '';
        document.getElementById('tr54'+num).style.display = '';
        document.getElementById('tr55'+num).style.display = '';
        document.getElementById('tr56'+num).style.display = '';
        document.getElementById('tr57'+num).style.display = '';
        document.getElementById('tr58'+num).style.display = '';
        document.getElementById('tr59'+num).style.display = '';
        document.getElementById('tr60'+num).style.display = '';
        document.getElementById('tr61'+num).style.display = '';
        document.getElementById('tr62'+num).style.display = '';
        document.getElementById('tr63'+num).style.display = '';
        document.getElementById('tr64'+num).style.display = '';
        document.getElementById('tr65'+num).style.display = '';
        document.getElementById('tr66'+num).style.display = '';
        document.getElementById('tr67'+num).style.display = '';
        document.getElementById('tr68'+num).style.display = '';
        document.getElementById('tr69'+num).style.display = '';
        document.getElementById('tr70'+num).style.display = '';
        document.getElementById('tr71'+num).style.display = '';
      }
      else
      {
        document.getElementById('tr48'+num).style.display = 'none';
        document.getElementById('tr49'+num).style.display = 'none';
        document.getElementById('tr50'+num).style.display = 'none';
        document.getElementById('tr51'+num).style.display = 'none';
        document.getElementById('tr52'+num).style.display = 'none';
        document.getElementById('tr53'+num).style.display = 'none';
        document.getElementById('tr54'+num).style.display = 'none';
        document.getElementById('tr55'+num).style.display = 'none';
        document.getElementById('tr56'+num).style.display = 'none';
        document.getElementById('tr57'+num).style.display = 'none';
        document.getElementById('tr58'+num).style.display = 'none';
        document.getElementById('tr59'+num).style.display = 'none';
        document.getElementById('tr60'+num).style.display = 'none';
        document.getElementById('tr61'+num).style.display = 'none';
        document.getElementById('tr62'+num).style.display = 'none';
        document.getElementById('tr63'+num).style.display = 'none';
        document.getElementById('tr64'+num).style.display = 'none';
        document.getElementById('tr65'+num).style.display = 'none';
        document.getElementById('tr66'+num).style.display = 'none';
        document.getElementById('tr67'+num).style.display = 'none';
        document.getElementById('tr68'+num).style.display = 'none';
        document.getElementById('tr69'+num).style.display = 'none';
        document.getElementById('tr70'+num).style.display = 'none';
        document.getElementById('tr71'+num).style.display = 'none';
      }
    }
    // show or hide spouse section
    function toggleSpouse()
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = "showSpouseInfo";
        var spouseBtn = document.getElementById("btnSpouseBtn");
        if (table.className && table.className.indexOf(showInfo) !== -1)
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (spouseBtn)
          {
            spouseBtn.value = "Show";
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (spouseBtn)
          {
            spouseBtn.value = "Hide";
          }
        }
      }
    }
    // show or hide Member1 section
    function toggleMember1()
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = "showMember1Info";
        var Member1Btn = document.getElementById("btnMember1Btn");
        if (table.className && table.className.indexOf(showInfo) !== -1)
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (Member1Btn)
          {
            Member1Btn.value = "Show";
            document.getElementById("cboMem1Type").style.display = 'none';
            document.getElementById("labelMem1Type").style.display = 'none';
            if (document.getElementById("reqlblMem1Type") != null)
              document.getElementById("reqlblMem1Type").style.display = 'none';
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (Member1Btn)
          {
            Member1Btn.value = "Hide";
            document.getElementById("cboMem1Type").style.display = 'inline';
            document.getElementById("labelMem1Type").style.display = 'inline';
            if (document.getElementById("reqlblMem1Type") != null)
              document.getElementById("reqlblMem1Type").style.display = 'inline';
          }
        }
      }
    }
    // show or hide Fund section
    function toggleFund()
    {
      var table = document.getElementById("mainTable");
      if (table)
      {
        var showInfo = "showFundInfo";
        var FundBtn = document.getElementById("btnFundBtn");
        if (table.className && table.className.indexOf(showInfo) !== -1)
        {
          table.className = table.className.replace(" " + showInfo, "");
          table.className = table.className.replace(showInfo, "");
          if (FundBtn)
          {
            FundBtn.value = "Show";
          }
        }
        else
        {
          if (!table.className || "" == table.className)
          {
            table.className = showInfo;
          }
          else
          {
            table.className += " " + showInfo;
          }
          if (FundBtn)
          {
            FundBtn.value = "Hide";
          }
        }
      }
    }
    // e-mail validation
    function IsValidEmail(str)
    {
      return (str.indexOf(".") > 0) && (str.indexOf("@") > 0);
    }
    // number validation
    function IsNumeric(strString) // check for valid numeric strings
    {
      var strValidChars = "0123456789.-";
      var strChar;
      var blnResult = true;
      if (strString.length == 0) return false; // test strString consists of valid characters listed above
      for (i = 0; i < strString.length &&  blnResult == true; i++)
      {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
        {
          blnResult = false;
        }
      }
      return blnResult;
    }
    // date validation
    function validateDate(argDate)
    {
      var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
      var okay = false
      if (!validformat.test(argDate))
      {
        okay = false
      }
      else
      { //Detailed check for valid date ranges
        var monthfield=argDate.split("/")[0]
        var dayfield=argDate.split("/")[1]
        var yearfield=argDate.split("/")[2]
        var dayobj = new Date(yearfield, monthfield-1, dayfield)
        if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
        {
          okay = false
        }
        else
        {
          okay = true
        }
      }
      return okay
    }
    // radio button validation
    function RbtnChecked(argRbtn)
    {
      var rbtnResult=true;
      if (argRbtn.checked==false)
      {
        rbtnResult=false;
      }
      return rbtnResult;
    }
    function CheckForm()
    {
      if (errcaptcha == true) {
        showmodal("", "Information", "Captcha service is not available.<br><br>Please contact your church.");
        return false;
      }
      else if (errstr != "") {
        showmodal("", "Information", errstr);
        return false;
      }
      var theForm = document.forms["CORegForm"];
      var okay = true;
      var str = '';
      if (((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==true)) ||
          ((document.getElementById('rbtNewRegID') != null) && (document.getElementById('rbtNewRegID').checked==true))) {
        if ((document.CORegForm.txaHeadFirstName.value=='') && (okay == true))
        {
          showmodal('txaHeadFirstName', "Information", 'Please enter head of household first name.');
          okay = false;
          document.CORegForm.txaHeadFirstName.focus();
        }
        else if ((document.CORegForm.txaHeadLastName.value=='') && (okay == true))
        {
          showmodal('txaHeadLastName', "Information", 'Please enter head of household last name.');
          okay = false;
          document.CORegForm.txaHeadLastName.focus();
        }
        else if ((document.CORegForm.dteHeadBirthday.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteHeadBirthday.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter date of birth format as mm/dd/yyyy.';
            showmodal('dteHeadBirthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteHeadBirthday.focus();
          }
        }
        else if ((!RbtnChecked(document.CORegForm.rbtHeadGender[0])) &&
                 (!RbtnChecked(document.CORegForm.rbtHeadGender[1])) &&
            (document.CORegForm.txaHeadFirstName.value!=''))
        {
          if (okay == true)
          {
            var errorMessage = 'Please select head of household gender.';
            showmodal('rbtHeadGenderMale', "Information", errorMessage);
            okay=false;
            document.CORegForm.rbtHeadGenderMale.focus();
          }
        }
        else if ((document.CORegForm.dteSpouseBirthday.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteSpouseBirthday.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter date of birth format as mm/dd/yyyy.';
            showmodal('dteSpouseBirthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteSpouseBirthday.focus();
          }
        }
        else if ((document.CORegForm.txaStreetAddress.value=='') && (okay == true))
        {
          showmodal('txaStreetAddress', "Information", 'Please enter the street address.');
          okay = false;
          document.CORegForm.txaStreetAddress.focus();
        }
        else if ((document.CORegForm.txaStreetCity.value=='') && (okay == true))
        {
          showmodal('txaStreetCity', "Information", 'Please enter the street city.');
          okay = false;
          document.CORegForm.txaStreetCity.focus();
        }
        else if ((document.CORegForm.cboStreetState.selectedIndex == 0) && (okay == true))
        {
          showmodal('cboStreetState', "Information", 'Please select street state in the pull down list.');
          okay = false;
          document.CORegForm.cboStreetState.focus();
        }
        else if ((document.CORegForm.txaStreetZIP.value=='') && (okay == true))
        {
          showmodal('txaStreetZIP', "Information", 'Please enter the street zip.');
          okay = false;
          document.CORegForm.txaStreetZIP.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num1.value==''))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num2.value==''))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num3.value==''))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num1.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num1.value))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num2.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num2.value))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num3.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num3.value))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.cbxAddrEmailUnl.checked) &&
                 (document.CORegForm.txaAddrEmail.value==''))
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if ((document.CORegForm.txaAddrEmail.value=='') && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if (!IsValidEmail(document.CORegForm.txaAddrEmail.value) && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Family email address is incorrect.');
          okay = false;
          document.CORegForm.txaAddrEmail.focus();
        }
        else if ((document.CORegForm.dteFund1Start.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund1Start.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter start date format as mm/dd/yyyy.';
            showmodal('dteFund1Start', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund1Start.focus();
          }
        }
        else if ((document.CORegForm.cboTermFund1.value !="14")&&
                 (document.CORegForm.dteFund1End.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund1End.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter end date format as mm/dd/yyyy.';
            showmodal('dteFund1End', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund1End.focus();
          }
        }
        else if ((document.CORegForm.dteFund2Start.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund2Start.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter start date format as mm/dd/yyyy.';
            showmodal('dteFund2Start', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund2Start.focus();
          }
        }
        else if ((document.CORegForm.cboTermFund2.value !="14")&&
                 (document.CORegForm.dteFund2End.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund2End.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter end date format as mm/dd/yyyy.';
            showmodal('dteFund2End', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund2End.focus();
          }
        }
        else if ((document.CORegForm.dteMemberBirthday.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteMemberBirthday.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter date of birth format as mm/dd/yyyy.';
            showmodal('dteMemberBirthday', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteMemberBirthday.focus();
          }
        }
        for (var i=2; i<=memNum; i++)
        {
        }
      }
      else if ((document.getElementById('rbtEditRegID') != null) && (document.getElementById('rbtEditRegID').checked==true)) 
      {
        if (theForm.elements['txaFamIDEnv'].value=='')
        {
          showmodal("txaFamIDEnv", "Information", 'Please enter your ID/Env number.\n\nCall Annunciation Greek Orthodox Cathedral at (614) 224-9020, if you\ndo not know your ID Number or Envelope Number.');
          okay = false;
          theForm.elements['txaFamIDEnv'].focus();
        }
        else if (theForm.elements['txaHeadFirstName'].value=='')
        {
          showmodal("txaHeadFirstName", "Information", 'Please select head first name');
          okay = false;
          theForm.elements['txaHeadFirstName'].focus();
        }
        else if (theForm.elements['txaHeadLastName'].value=='')
        {
          showmodal("txaHeadLastName", "Information", 'Please select head last name');
          okay = false;
          theForm.elements['txaHeadLastName'].focus();
        }
        else if ((theForm.elements['rbtHeadGenderMale'].checked==false) &&
                 (theForm.elements['rbtHeadGenderFemale'].checked==false))
        {
          showmodal("rbtHeadGenderMale", "Information", 'Please select head gender');
          okay = false;
          theForm.elements['rbtHeadGenderMale'].focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num1.value==''))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num2.value==''))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if ((document.CORegForm.cbxAddrPhone1Unl.checked) &&
                 (document.CORegForm.txnAddrPhone1Num3.value==''))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num1.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter the family phone area code.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num1.value))
        {
          showmodal("txnAddrPhone1Num1", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num1.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num2.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter the family phone prefix.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num2.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num2.value))
        {
          showmodal("txnAddrPhone1Num2", "Information", 'Please enter number for phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Numm2.focus();
        }
        else if ((document.CORegForm.txnAddrPhone1Num3.value=='') && (okay == true))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter the family phone number.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (!IsNumeric(document.CORegForm.txnAddrPhone1Num3.value))
        {
          showmodal("txnAddrPhone1Num3", "Information", 'Please enter number for the phone.');
          okay = false;
          document.CORegForm.txnAddrPhone1Num3.focus();
        }
        else if (theForm.elements['txaAddrEmail'].value=='')
        {
          showmodal("txaAddrEmail", "Information", 'Please enter the family email address');
          okay = false;
          theForm.elements['txaAddrEmail'].focus();
        }
        else if (!IsValidEmail(theForm.elements['txaAddrEmail'].value) && (okay == true))
        {
          showmodal("txaAddrEmail", "Information", 'Family email address is incorrect.');
          okay = false;
          theForm.elements['txaAddrEmail'].focus();
        }
        if ((document.CORegForm.dteFund1Start.value!='mm/dd/yyyy')&&
            (!validateDate(document.CORegForm.dteFund1Start.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter start date format as mm/dd/yyyy.';
            showmodal('dteFund1Start', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund1Start.focus();
          }
        }
        else if ((document.CORegForm.cboTermFund1.value !="14")&&
                 (document.CORegForm.dteFund1End.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund1End.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter end date format as mm/dd/yyyy.';
            showmodal('dteFund1End', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund1End.focus();
          }
        }
        else if ((document.CORegForm.dteFund2Start.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund2Start.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter start date format as mm/dd/yyyy.';
            showmodal('dteFund2Start', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund2Start.focus();
          }
        }
        else if ((document.CORegForm.cboTermFund2.value !="14")&&
                 (document.CORegForm.dteFund2End.value!='mm/dd/yyyy')&&
                 (!validateDate(document.CORegForm.dteFund2End.value)))
        {
          if (okay == true)
          {
            var errorMessage = 'Please enter end date format as mm/dd/yyyy.';
            showmodal('dteFund2End', "Information", errorMessage);
            okay=false;
            document.CORegForm.dteFund2End.focus();
          }
        }
      }
      else
      {
        showmodal("rbtNewRegID", "Information", 'Please select a registration option');
        okay = false;
        if (document.getElementById('rbtNewRegID') != null)
          document.getElementById('rbtNewRegID').focus();
      }
      if (okay == true) {
        var ckvisible = document.getElementById("captsection").style.display;
        if (ckvisible == "none") {
          GetNewCaptcha();
          document.getElementById("captsection").scrollIntoView();
          document.getElementById("appCaptcha").focus();
          okay = false;
        }
      }
      if ((okay == true) && (ckvisible == "block") && (document.getElementById("appCaptcha").value=="")) {
        document.getElementById("captsection").scrollIntoView();
        showmodal("appCaptcha", "Information", "Please enter the characters.");
        okay = false;
      }
      else if ((okay == true) && (ckvisible == "block") && (document.getElementById("appCaptcha").value!="")) {
        var clen = document.getElementById("appCaptcha").value;
        if ((clen.length < 3) || (clen.length > 5)) {
          document.getElementById("captsection").scrollIntoView();
          showmodal("appCaptcha", "Information", "Please enter the same characters.");
          okay = false;
        }
      else okay = true;
      }
      if (okay == true)
        showmodal("", "Confirmation", "Are you ready to submit the form?");
      return okay;
    }
    // get fund period
    function ShowFundPeriod(val, prd)
    {
      var okay = true;
      for (var i=0; i<fndFN.length; i++)
      {
        if (fndFN[i] == val)
        {
          document.getElementById('Fund'+prd+'Period').innerHTML = '('+fndDR[i]+')';
        }
      }
      return okay;
    }
    function checkDR(f,e)
    {
      var theForm = document.forms["CORegForm"];
      if ((theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')&&
          (!validateDate(theForm.elements['dteFund'+f+e].value)))
      {
        clickOutSide();
        showmodal('dteFund'+f+e, "Information", 'Please enter valid '+e+' date format as mm/dd/yyyy.');
    	  theForm.elements['dteFund'+f+e].focus();
      }
      else if ((theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')&&
               (!validateDate(theForm.elements['dteFund'+f+e].value))) {
        clickOutSide();
        showmodal('dteFund'+f+e, "Information", 'Please enter valid '+e+' date format as mm/dd/yyyy.');
    	  theForm.elements['dteFund'+f+e].focus();
      }
      else if (theForm.elements['dteFund'+f+e].value!='mm/dd/yyyy')
      {
        if ((theForm.elements['cboRecurrFund'+f].value != '')&&
            (theForm.elements['cboTermFund'+f].value != '')&&
            (theForm.elements['dteFund'+f+'Start'].value != '')&&
            (theForm.elements['dteFund'+f+'End'].value != ''))
        {
          CalcRate(f);
          if (theForm.elements['dteFund'+f+'Start'].value > theForm.elements['dteFund'+f+'End'].value)
          {
            theForm.elements['dteFund'+f+'End'].value = theForm.elements['dteFund'+f+'Start'].value;
            theForm.elements['dteFund'+f+'End'].focus();
          }
        }
      }
    }
    // calculate and display each fund
    function ATotal(f)
    {
      Math.E
      Math.PI
      Math.SQRT2
      Math.SQRT1_2
      Math.LN2
      Math.LN10
      Math.LOG2E
      Math.LOG10E
      var theForm = document.forms["CORegForm"];
      var amt = theForm.elements['amtTotalFund'+f].value;
      return amt; //return total;
    }
    function CheckTotalAndRate(id1, id2) {
      if ((document.getElementById(id1) != null) && (document.getElementById(id2) != null) && (document.getElementById(id1).value == "") && (document.getElementById(id2).value != ""))
        document.getElementById(id2).value = "";
      if ((document.getElementById(id1) != null) && (document.getElementById(id2) != null) && (document.getElementById(id2).value == "") && (document.getElementById(id1).value != ""))
        document.getElementById(id1).value = "";
    }
    // calculate total all
    function TotalConAll()
    {
      var all = 0.0;
      var each = 0.0;
      for (var i=1; i<fndFN.length+1; i++)
      {
        each = ATotal(i);
        if (each > 0)
        {
      	  all = all + parseFloat(each);
        }
      }
      var sm = parseFloat(all);
      if (sm>0)
      {
        document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $'+sm.toFixed(2);
      }
      else
      {
        document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $0.00';
        for (var i=1; i<fndFN.length+1; i++) {
          if ((document.getElementById("amtTotalFund"+i) != null) && (document.getElementById("amtTotalFund"+i).value != ""))
            document.getElementById("amtTotalFund"+i).value = "";
          if ((document.getElementById("amtRateFund"+i) != null) && (document.getElementById("amtRateFund"+i).value != ""))
            document.getElementById("amtRateFund"+i).value = "";
        } //for
      }
    }
    // clear total
    function ClearTotal()
    {
      document.getElementById('ConSummary').innerHTML = 'Total All Pledges = $0.00';
      for (var i=1; i<fndFN.length+1; i++) {
        if ((document.getElementById("amtTotalFund"+i) != null) && (document.getElementById("amtTotalFund"+i).value != ""))
          document.getElementById("amtTotalFund"+i).value = "";
        if ((document.getElementById("amtRateFund"+i) != null) && (document.getElementById("amtRateFund"+i).value != ""))
          document.getElementById("amtRateFund"+i).value = "";
      } //for
    }
    // auto move to a next phone field
    function autoTab(current,next)
    {
      if (current.getAttribute&&current.value.length==current.getAttribute("maxlength"))next.focus();
    }
   function onKeyPressed(evt, input) {
     var code = evt.charCode || evt.keyCode;
     if ((code == 27) || (code == 9) || (code == 13)) {
       if (!validateDate(input.value))
         input.value = 'mm/dd/yyyy';
       clickOutSide();
       return false;
     }
   }
   function clickOutSide() {
     if ((calendar !== null) && (_calendar_active_instance !== null)) {
       var ths = _calendar_active_instance;
       if (ths.hasOwnProperty("hideCalendar"))
         ths.hideCalendar();
     }
   }
   function documentClick(e)
   {
     if (document.calendarClicked)
     {
       document.calendarClicked = false;
     }
     else
     {
       clickOutSide();
     }
   }
   var calendar =
   {
     month_names: ["January","February","March","April","May","June","July","August","September","October","November","December"],
     weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
     month_days: [31,28,31,30,31,30,31,31,30,31,30,31],
     //Get today's date - year, month, day and date
     today : new Date(),
     opt : {},
     data: [],
     //Functions
     // Used to create HTML in a optimized way.
     wrt:function(txt)
     {
       this.data.push(txt);
     },
     /* Inspired by http://www.quirksmode.org/dom/getstyles.html */
     getStyle: function(ele, property)
     {
       if (ele.currentStyle)
       {
         var alt_property_name = property.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});//background-color becomes backgroundColor
    	 var value = ele.currentStyle[property]||ele.currentStyle[alt_property_name];
       }
       else if (window.getComputedStyle)
       {
         property = property.replace(/([A-Z])/g,"-$1").toLowerCase();//backgroundColor becomes background-color
    	 var value = document.defaultView.getComputedStyle(ele,null).getPropertyValue(property);
       }
       //Some properties are special cases
       if(property == "opacity" && ele.filter) value = (parseFloat( ele.filter.match(/opacity\=([^)]*)/)[1] ) / 100);
       else if(property == "width" && isNaN(value)) value = ele.clientWidth || ele.offsetWidth;
       else if(property == "height" && isNaN(value)) value = ele.clientHeight || ele.offsetHeight;
       return value;
     },
     getPosition:function(ele)
     {
       var x = 0;
       var y = 0;
       while (ele)
       {
         x += ele.offsetLeft;
    	 y += ele.offsetTop;
    	 ele = ele.offsetParent;
       } //while
       if (navigator.userAgent.indexOf("Mac") != -1 && typeof document.body.leftMargin != "undefined")
       {
         x += document.body.leftMargin;
    	 offsetTop += document.body.topMargin;
       }
       var xy = new Array(x,y);
       return xy;
     },
     // Called when the user clicks on a date in the calendar.
     selectDate:function(year,month,day)
     {
       var ths = _calendar_active_instance;
       //document.getElementById(ths.opt["input"]).value = year + "-" + month + "-" + day; // Date format is :HARDCODE:
       document.getElementById(ths.opt["input"]).value = month + "/" + day + "/" + year; // Date format is :HARDCODE:
       ths.hideCalendar();
     },
     // Creates a calendar with the date given in the argument as the selected date.
     makeCalendar:function(year, month, day)
     {
       year = parseInt(year);
       month = parseInt(month);
       day = parseInt(day);
       //Display the table
       var next_month = month+1;
       var next_month_year = year;
       if(next_month>=12)
       {
    	 next_month = 0;
    	 next_month_year++;
       }
       var previous_month = month-1;
       var previous_month_year = year;
       if(previous_month< 0)
       {
         previous_month = 11;
    	 previous_month_year--;
       }
       this.wrt("<table>");
       this.wrt("<tr><th><a href='javascript:calendar.makeCalendar("+(previous_month_year)+","+(previous_month)+");' title='"+this.month_names[previous_month]+" "+(previous_month_year)+"'>&lt;</a></th>");
       this.wrt("<th colspan='5' class='calendar-title'><select name='calendar-month' class='calendar-month' onChange='calendar.makeCalendar("+year+",this.value);'>");
       for(var i in this.month_names)
       {
         this.wrt("<option background='#FEFCFF' value='"+i+"'");
    	 if(i == month) this.wrt(" selected='selected'");
    	 this.wrt(">"+this.month_names[i]+"</option>");
       }
       this.wrt("</select>");
       this.wrt("<select background='#FEFCFF' name='calendar-year' class='calendar-year' onChange='calendar.makeCalendar(this.value, "+month+");'>");
       var current_year = this.today.getYear();
       if(current_year < 1900) current_year += 1900;
       for(var i=1899; i<current_year+500; i++)
       {
       	 this.wrt("<option value='"+i+"'")
    	 if(i == year) this.wrt(" selected='selected'");
    	 this.wrt(">"+i+"</option>");
       }
       this.wrt("</select></th>");
       this.wrt("<th><a href='javascript:calendar.makeCalendar("+(next_month_year)+","+(next_month)+");' title='"+this.month_names[next_month]+" "+(next_month_year)+"'>&gt;</a></th></tr>");
       this.wrt("<tr class='header'>");
       for(var weekday=0; weekday<7; weekday++) this.wrt("<td>"+this.weekdays[weekday]+"</td>");
       this.wrt("</tr>");
       //Get the first day of this month
       var first_day = new Date(year,month,1);
       var start_day = first_day.getDay();
       var d = 1;
       var flag = 0;
       //Leap year support
       if(year % 4 == 0) this.month_days[1] = 29;
       else this.month_days[1] = 28;
       var days_in_this_month = this.month_days[month];
       //Create the calender
       for(var i=0;i<=5;i++)
       {
    	 if(w >= days_in_this_month) break;
    	 this.wrt("<tr>");
    	 for(var j=0;j<7;j++)
         {
    	   if(d > days_in_this_month) flag=0; //If the days has overshooted the number of days in this month, stop writing
    	   else if(j >= start_day && !flag) flag=1;//If the first day of this month has come, start the date writing
    	   if(flag)
           {
    	     var w = d, mon = month+1;
    	     if(w < 10)	w	= "0" + w;
    	     if(mon < 10)mon = "0" + mon;
    	     //Is it today?
    	     var class_name = '';
    	     var yea = this.today.getYear();
    	     if(yea < 1900) yea += 1900;
    	     if(yea == year && this.today.getMonth() == month && this.today.getDate() == d) class_name = " today";
    	     if(day == d) class_name += " selected";
    	     class_name += " " + this.weekdays[j].toLowerCase();
    	     this.wrt("<td class='days"+class_name+"'><a href='javascript:calendar.selectDate(\""+year+"\",\""+mon+"\",\""+w+"\")'>"+w+"</a></td>");
    	     d++;
    	   }
           else
           {
    	     this.wrt("<td class='days'>&nbsp;</td>");
    	   }
    	 }
    	this.wrt("</tr>");
      }
      this.wrt("</table>");
      this.wrt("<table>");
      this.wrt("  <tr>");
      this.wrt("    <td>");
      this.wrt("      <input type='button' value='Clear' class='calendar-cancel' onclick='calendar.clearCalValue();' />");
      this.wrt("    </td>");
      this.wrt("    <td>");
      this.wrt("      <input type='button' value='Close' class='calendar-cancel' onclick='calendar.hideCalendar();' />");
      this.wrt("    </td>");
      this.wrt("  </tr>");
      this.wrt("</table>");
      document.getElementById(this.opt['calendar']).innerHTML = this.data.join("");
      this.data = [];
    },
    // Display the calendar - if a date exists in the input box, that will be selected in the calendar.
    showCalendar: function()
    {
      var mobilePos = "";
      var eleName = document.getElementById(this.opt['input']).name;
      if ((bw < 640) && (eleName.search("Fund")>0) && (eleName.search("End")>0))
        mobilePos = "Yes";
      if (!validateDate(document.getElementById(this.opt['input']).value)) {
        document.getElementById(this.opt['input']).value = 'mm/dd/yyyy'
      }
      var input = document.getElementById(this.opt['input']);
      //Position the div in the correct location...
      var div = document.getElementById(this.opt['calendar']);
      var xy = this.getPosition(input);
      var width = parseInt(this.getStyle(input,'width'));
      if (mobilePos != "")
        div.style.left=(xy[0]-(width/2)+10)+"px"
      else
        div.style.left=(xy[0]+width+10)+"px";
      div.style.top=xy[1]+"px";
      // Show the calendar with the date in the input as the selected date
      if ((input.value!='mm/dd/yyyy')&& (validateDate(input.value))) {
        var existing_date = new Date(input.value);
      }
      else {
        var existing_date = new Date();
      }
      var date_in_input = input.value;
      if(date_in_input) {
        var selected_date = false;
    	var date_parts = date_in_input.split("-");
    	if(date_parts.length == 3) {
    	  date_parts[1]--; //Month starts with 0
    	  selected_date = new Date(date_parts[0], date_parts[1], date_parts[2]);
    	}
    	if(selected_date && !isNaN(selected_date.getYear())) { //Valid date.
    	  existing_date = selected_date;
    	}
      }
      var the_year = existing_date.getYear();
      if(the_year < 1900) the_year += 1900;
      this.makeCalendar(the_year, existing_date.getMonth(), existing_date.getDate());
      document.getElementById(this.opt['calendar']).style.display = "block";
      _calendar_active_instance = this;
    },
    // Hides the currently show calendar.
    hideCalendar: function(instance) {
      var active_calendar_id = "";
      if(instance) active_calendar_id = instance.opt['calendar'];
      else active_calendar_id = _calendar_active_instance.opt['calendar'];
      if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
      _calendar_active_instance = {};
      document.getElementById(this.opt['input']).focus();
    },
    // Hides the currently show calendar.
    clearCalValue: function(instance) {
      var active_calendar_id = "";
      if(instance) active_calendar_id = instance.opt['calendar'];
      else active_calendar_id = _calendar_active_instance.opt['calendar'];
      if(active_calendar_id) document.getElementById(active_calendar_id).style.display = "none";
      _calendar_active_instance = {};
      document.getElementById(this.opt['input']).value = "mm/dd/yyyy";
      document.getElementById(this.opt['input']).focus();
    },
    // Setup a text input box to be a calendar box.
    set: function(input_id)
    {
      var input = document.getElementById(input_id);
      if(!input) return; //If the input field is not there, exit.
      if(!this.opt['calendar']) this.init();
      var ths = this;
      input.onclick=function()
      {
    	document.calendarClicked = true;
    	ths.opt['input'] = this.id;
    	ths.showCalendar();
      },
      input.onkeypress=function(e) {
        var code = e.charCode || e.keyCode;
        if ((code == 27) || (code == 9) || (code == 13)) {
          return false;
        }
      };
    },
    // Will be called once when the first input is set.
    init: function()
    {
      if(!this.opt['calendar'] || !document.getElementById(this.opt['calendar']))
      {
        var div = document.createElement('div');
    	if(!this.opt['calendar']) this.opt['calendar'] = 'calender_div_'+ Math.round(Math.random() * 100);
    	div.setAttribute('id',this.opt['calendar']);
    	div.className="calendar-box";
    	document.getElementsByTagName("body")[0].insertBefore(div,document.getElementsByTagName("body")[0].firstChild);
    	div.onclick = function(e)
        {
    	  document.calendarClicked = true;
    	};
      }
    }
   }

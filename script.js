document.addEventListener("DOMContentLoaded", () => {
  const labReportBtn = document.getElementById("labReportBtn");
  const coverPageBtn = document.getElementById("coverPageBtn");
  const labReportFields = document.getElementById("labReportFields");
  const coverPageFields = document.getElementById("coverPageFields");

  let labReport = true;
  let assignment = false;

  labReportBtn.addEventListener("click", () => {
    labReportBtn.classList.add("bg-blue-600", "text-white");
    labReportBtn.classList.remove("bg-gray-300", "text-gray-700");
    coverPageBtn.classList.add("bg-gray-300", "text-gray-700");
    coverPageBtn.classList.remove("bg-blue-600", "text-white");

    labReportFields.classList.remove("hidden");
    coverPageFields.classList.add("hidden");

    labReport = true;
    assignment = false;
  });

  coverPageBtn.addEventListener("click", () => {
    coverPageBtn.classList.add("bg-blue-600", "text-white");
    coverPageBtn.classList.remove("bg-gray-300", "text-gray-700");
    labReportBtn.classList.add("bg-gray-300", "text-gray-700");
    labReportBtn.classList.remove("bg-blue-600", "text-white");

    coverPageFields.classList.remove("hidden");
    labReportFields.classList.add("hidden");

    labReport = false;
    assignment = true;
  });

  const generateBtn = document.getElementById("generateBtn");
  const previewModal = document.getElementById("previewModal");
  const closeModal = document.getElementById("closeModal");
  const documentPreview = document.getElementById("documentPreview");
  const downloadPdf = document.getElementById("downloadPdf");
  const downloadDoc = document.getElementById("downloadDoc");

  generateBtn.addEventListener("click", () => {
    const isLabReport = !labReportFields.classList.contains("hidden");
    const studentName = document.getElementById("studentName").value;
    const rollNo = document.getElementById("rollNo").value;
    const batchNo = document.getElementById("batchNo").value;
    const semesterNo = document.getElementById("semesterNo").value;
    const departmentStudent = document.getElementById("departmentStudent").value;
    const courseName = document.getElementById("courseName").value;
    const courseCode = document.getElementById("courseCode").value;
    const teacherName = document.getElementById("teacherName").value;
    const designation = document.getElementById("designation").value;
    const departmentTeacher = document.getElementById("departmentTeacher").value;

    if (
      !studentName ||
      !rollNo ||
      !batchNo ||
      !courseCode ||
      !semesterNo ||
      !departmentStudent ||
      !courseName ||
      !teacherName ||
      !designation ||
      !departmentTeacher
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    function documentType() {
      if (labReport) {
        return "LAB REPORT";
      } else {
        return "ASSIGNMENT";
      }
    }

    const doctype = documentType();

    let documentHTML = "";

    if (isLabReport) {
      const labReportTitle = document.getElementById("labReportTitle").value;
      const labReportNo = document.getElementById("labReportNo").value;
      const submissionDate = document.getElementById("submissionDate").value;
      const formattedSubmissionDate = submissionDate
        ? new Date(submissionDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";

      documentHTML = `
            <div class="headerElement">
                <center>
                    <img src="data:image/png;base64,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" style="width: 190px; height: 100px;" class="uni-logo -mt-10" >
                    <div class="document-title">${doctype}</div>
                </center>
            </div>

            <div class="text-center mb-12">
                <p class="course-title">${courseName}</p>
                <p class="course-code">Course Code : ${courseCode}</p>
            </div>
            
            <div class="info-list">
                <ul class="w-full">
                    <li>Lab Report Title : ${labReportTitle}</li>
                    <li>Lab Report No : ${labReportNo}</li>
                    <li>Date Of Submission : ${formattedSubmissionDate}</li>
                </ul>
            </div>

            <table class="submission-table">
                <thead>
                    <tr>
                        <td>Submitted By:</td>
                        <td>Submitted To:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${studentName}</td>
                        <td>${teacherName}</td>
                    </tr>
                    <tr>
                        <td>Roll No : ${rollNo}</td>
                        <td>${designation}</td>
                    </tr>
                    <tr>
                        <td>Batch : ${batchNo}</td>
                        <td>${departmentTeacher}</td>
                    </tr>
                    <tr>
                        <td>Semester No : ${semesterNo}</td>
                        <td>Dhaka International University</td>
                    </tr>
                    <tr>
                        <td>${departmentStudent}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dhaka International University</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            `;
    } else {
      const assignmentTitle = document.getElementById("assignmentTitle").value;
      const assignmentNo = document.getElementById("assignmentNo").value;
      const assignmentSubmissionDate = document.getElementById("assignmentSubmissionDate").value;
      const formattedSubmissionDateAssignment = assignmentSubmissionDate
        ? new Date(assignmentSubmissionDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";

      documentHTML = `
            <div class="headerElement">
                <center>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADQCAMAAAAeTscmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJZQTFRFAAAA////GKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youGKxPIx8g6youBnPuiQAAAC90Uk5TAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICPj4+fn5+vr6+/v7/Pz8/f39/v7+9kqOEhAAAViElEQVR42u2daWOivBaAuVJpGdMypTqmZWTKK1NGKh39/3/uQhZIWLIA4jI5X2pVwkmenBVU639GLkosswQGiBEDxAAxYoAYIEYMEAPEiAFigBgxQIwYIAaIEQPk5oDElbhWUP3jWyOKSwZVPsAvVRp65uxwCKTvijmB0LOt04oAyKESYMXVP3DM8wMyqPIBsFRpoMRKpz00JLQNkJMAKQZKegA5JPaZgJBdRL2Jl5v4IXVPoIMWEHoAGL4XoG8rbwF0APDRvkwuAgg83eY4ExAtm6T/hMU//vmB2OEJ3ec1AbHROpwdiJMUetCcxAZYcjweLHIPzo85qyIjiyBeMZe8160eFo/pw2KMOhB3FeYDBL7Da+r4AXrargNhXnDLE1QvhLDFzdIp0P/RPMKV6zLPtQJhnYbtwaiYPvZ8dMj8eIeZXvkYT8f2IbM61QI5dOGUgBQZImOoNBD7QUYzj8oxV9E/g7ZVJgNx9bB4zKQLNSB+Wr4WMWvjRkyawwJxmBecuDwBd0Tqi3MJkLJBWwwkoeM7YcacuRryUCUehZaQzYWcsNIJ2lWyV7wa4AcqQHy0vG5jNoyQGdsh92yeAmgCIUuaxXiygV3LrfCrDJAV90JWASHzi/FaJ64ASG0+QiAOdRV+xh0EVYAQZZMErw5ggATJQRlIWJ+RAyE5TbICLsq+IswDjZqFK+AFeCGAD4vDc7POpwAzbDj5YwiL/RtC6HBAkClm6EkHvZtkEUiFLAC5S6FWiYHgZY98ADy6YfNBfXJEhJT2En4/kSmE5WkTYo0uVlAExEUzzPXz8fwhADAiRgJhWmx8WORvMVHFyR+j/BrmTgqdMfaQTjHdxj5Ex2VolXKRA0mRlquWuBrjRfFLr4qWJyK7eoUWN/8npS+7eMXw0uTTyBpBnVs6FLhQ3PLQ5B3OCkG5t+lesaPqBcj52OKI1G7zWvT8RBU77QKSp7wQkm0MyVQywFLy8TuxlinjyYv18egsyt5AYS2Zw9SoZN0ULKQWQRqJDii96qG0lXLGxFAdsi6FUwnpe2EdiM9HazsjRyb8gobl22L+hYi+UM+FopYtVQEpVo9E/mK/dpWiVAIyYGV0yDOk+LQBHTvF2xEpmdLTxPywYQUk1ciyMBEoBeIfyh1SLlyM1zUkqxQWRmQTY3LqQNA0YSUJXke7tiGc8uRdL3jEd1EJW8q5Cgj1vzFcAUFvADv+0KEnZhbEI5YfEgjFX5dsAvoXnS+qdAoqw4yZ0TSyrFAGBPJbAAOySjWRpRDLoJB4IHFLoyIiU7FbTg5qOwCZEmjZ1G3BugJCEwAcAO1WIDCHRbJ0bkvwGrl4gzjIUohlUEigTSe3nLenVYc0iegAcfAewbEkQmr67IQ4IBnfX40DGRC7C0htoLgbiOUEVeKbOcK0VwiEQMCxxEPLXG49HO9qOlVAgF6l3iDS6bLshssiamL90Lv9Ak7SrNQjxpeyVdyB2UE0OQAtL5QFil/tPnFbk1ljsII42Y7lQLpcFtloKQ6laAeuqCagpmyt8awJpEGkDYjdHtSxvh4T22LA+X4+qLPBl5wh5UNAXJ484V8IOVLswrqOAAjz3rbFb3uuPahjVSNq/shHlzmmldWagY4zBEidSBuQjrQXq5nQtfZJBtLSy0JZZ0UqrxKzsNzwdFw2u/XYDhubDwd86w0WJZMICJ2LpwikPe2lTX1Cp/BWaTWhFd+ezdcnWdk6QHDFUpQ6sMgHI1IKQZ8WhiGE1JPjN+HC8MAWhmw9jenYGXtVhY6F001MPfbzved4YdUDiJuFIT45ek+6Kjplq5StGBNyRNFjwrqEbYUhKiLxeF4+OC5GORoQF3kQQi4Do4WhVxaGjNekDPAMUs6Ac53yZQBY2xwPKQxRTgiUL1BxCVAM+ItVTBui2TphKgqqM85pnEYbhmmdNEYIuCeZk3MnzNJqDwS1fAa2tk74Ps7h0KjpO0dotE64Vber2M8c11bRxLVBxgXSbC6yajpMihJarUDyiSbMtbkqzoCIGZZdBC9lXmBtn2nk5Z7PsYRAsnJ5I8dSAtJoLrLOLGCjnd1+DNFJAwiohOmdA+Da1WOn2cqmTW/Owp3iKfpP8Tqo9cGZtreDOtQxrPXfHS93M8RJsg1ty4VFux56JG4ylT5ujwct5V51WnwtwLXw6PWevwX4ufKDcO33cu/lTzll7zt/uX6dEl1cKJfHrZ1BHNSvTGztS12nlV+jX6C6Mgnb65hzyf3xXwTiZqHLXhvzLshA/kUgKP1MIwij9HDqy926cvwXgUAu+0w9ywA5dyD3o4x2xr3LUu3fBEKTU/fytPqHgVymGCAGiJEpgcwWvWU+xnweFkNkPsIgDw2dtA49Hh9HBbL4O0y22/f1erHoDWQ76OzrEQbZNnTSOlQfyOtJgVDZbdfPDwaISq/l624KIEj278sHA0Qij8eXyYAgU9k8/WNAXnWBvIqAzNdY3rYjGspG3U6eyfnfdxon+NiQo0jsen5Gw2x3Oi72jYzx3NAJPb39kCvw3AfIqxgIuzYjMvl41o4m8/VebSmfZ91jLJXG2K+VMsTF216uwAmB5Ej2I7oufSSzd4W1XErG2MjHeJ8pq9QEXFfgePytN8v/NIBYD3uZoe9OiuRZOqjcGW70g4aoTqqtyP7BGgjktw4Q60EpiFrzxWK5fv+QOi7t+uRNLYoLRaLWfqal0ZOYRw7kU2+KX1pAJPurvh6LpSTubGaaXmuExXwSj/GmuUe4FVm2tE40eydHPSDPuhtUEov3T3rqbocvpgSqpkLWnPXCbet7vNPLevWALPQ9xkyM5G3Wez82ZKk0hjgQartRJtV4bgWiVRm+aAKZ93Hhc2F69KHThVyPsJhiK9PONJbVsbNWIN/1sl49IFa/mLoUuq2HqwayEHmsAkhLIXL3+Pr647E9650EiCRhVk+AxTFsfg4gljBhzoE0bpV7zFe9kK9fzfDyORGQsYgsRlhMoZV9DADy1g6kXoj8PJby9dJqUVMAGYnIyYFs9YFsRdMvVp1/5teRlZdGkqUJZN+7LhuFyDUC4fNenkedyA9tINv+hfLTCAH5KoE81lacl2+1mD4dEHHjQy3XukogP5j06qsB5Hctpk8IRNxG+pjdKpBfXJnREMaA7o/TAhH3Jt9vFcgf3gLq8our0ycFIqnrljcKpIrq31p4sFnYr6mBzMSdxvmNAnnsDul8WP+cGoik0t7eKJDXlpqwLYjcHycHYu2G9b6vE8jv6nJgm7zyBjQtEHEU2d0mkKMikD9nACKOItIRrhTIdyUgd8czAJFcYpJdhL1SID+VYsjLWYAo3idxW0A+lbKsP2cBIgnrEhO5UiB0zYV1yP3xPEAkt/I83ySQnwqV+s8zAZH4rN1NAvlU6GV9nQmI5K4PcR/+WoHQVRd0e1+O5wIiuZlzc5NAfkmvh3yeDYjkDt39TQI53jOXoFj5UTeQ6YFIgoiwf3K9QMrq70977/3zfEBkQWRzk0C+7lo6jNVdJz+OZwSy7e+zrhcIc7/cI+2g/Lpvu7Q7PZB1/w95XDGQr3vmUu3L6+vr9zv+5obzAZF97mZ9k0CO/3UP8f14ViCyj/ZubxPI8aVrhPuv8wKRfbB4f6NAvr61D1BLvM4AZN87iFw1kOOfOwUe5wCy7V2JXDeQViJ1HpcIZH2rQFqI3P85nh+ILO99v1kgx6/vtfzq63gFQLa3C+R4/M3cOvr4u/US+8UB2d8ykNxv/fz+eP/4+Pjzs+Oeh8mBSL9j6LaBSMQAMUCkQBYGiAFigBggBogBYoAYIAaIAWKAGCAGyL8N5MEAMa0TA8QAuRggki8GFXxplQFiLlAZIKKve71oIIurBSL7guqlAXJZd50sDJDLAmIZIBd1K+mHAXJZQN4MkMu6+/3p5oH89/3Ouvt+MbcByT4fMrsuIHtdIL/Lj+68fF4EkHXfG0kvE4jw9C3fpMF9TOT1EoBIkqznmwbyp/Yhkcev8wPZ9/ZY1w+kefv7t69zA3no77EuEchCeEeylEeTyKV9k8PTtQLZyoGwn8RlvNaZgYh/jvD03wb0NC6QZw0gHb9+9OO8QIZ86+IYQBb9PgkhNbiNFEjnj37+PicQcQiZ4BvlxhijzeDXMiB/OsfgPhd9Wd8oN8F3Ls7GBfIhTNc7f5iCl9czAtkNMJBxdve4QMQXDVQcVi53n2cDshhiIOMAEf5qxlyTx0JcPx1bvg6oTV7OBmQzxEDGAfLe7+JYuyzFZ1czEOt835c16901GQ/Iekwg7+KEue1HKSSp7wV99/s0v44gHmStx2MmuYqjaiDMN2ZNCkT41e8T/X6I2Eo3PcvCDutWiyCF/DoLkHW/m01GriE+xivVPyTZQMvvGnXIt3MAERrI+2RF3dtoee9CdiNA/UtJBfLnDEBE+c1uNhmQh9Gi+ofsRgBpkd4M6xMCES3ndL9jKClO33rlvF31i+zL5Nj+yeRAhA7ryZoQyHpILVTJfC8NPWSR71SG6/VzFbsBQLZDKpBRgcxHSXxnH3JHJ/3+y2ZDa6JfixbX6FP+WrS0X/CgP0hnbqbusco8ayogzyPwGA2I0EQ+Zro8uisoDY9Ff7BiIiDrofFc4fKvRmNwPZjIRqmCav7+sED+mw7ITOAjPh5GWkedjHW2G0aEjR+iCupY+7lohcR3RCCdnvRBUBu/q2c1IwKRXLiUbZKnvSI+2ZWpliCiBWTR5waF2duwfolq51xvLMnNLyL3O39X9rgqjd5aENEC8qR/C898vR/HXUmzbq2aTvpLP7uuTGO+0YiA6klvIb+1gUgmsa9PYvYs2tN7PfOQ3je/s8Yk8ne3bGYJ8+WHVkaiE0JIJaIDRPoB87+79YJ41Pli+Sa8WPp3M9PkIf3o1XJcIrkFb5YLSuVhsdzsdE1ccDdWi3zXBPKw/zuebHSvXnOto6EFjUqOoCDSdIz9aWLFdpY6kKf9WXHM3hTGfdOzuoFTkgctjSqERnVVIE/b0WjsltrOSpwbSBy/aNgBs9orNESZX/lUjepCIPM1lrfxaOw3GpnVMzn/+07Hj7yTo5TqkmVfI1EqoJQbWVh+yoAs/o4ru7enUaN4/1qiM41VnYnaRLRiOk6zJgOyf1/Ox06rxgCSJ4/ap9mpZg9aMR1/MmESINu3Z/0oPhmQHImWlWzVkzm1q7fTAdltt2/rpwerr0wFpKXi64xQa52tpZdkIYsSApktesvcGkEeFkNEU4X58l0S4HfaXld+h5weEOtfk/livdm2pHT77WbdZ4/pJVko7zVABKa5fEJ/Zr3H+dRKslDzxAA5pfxUvXxbmYgBckr5dtQ84P7LADmp/Kd7wA8D5LQm0uMIA+TCxAC5HiA+bBVf7wSO7DDQOIPT/gZHdqpBelJxozhymdGEw/jtqnlBnEvo2/zIsHg24t5cW2MgBBIfWiXWmyCQHQYbZwDtbwCyUw3Sk0qaH5oyowmHidtU81KqQgaZjVktZ+w0BiACRwYCwlGB2AG4QiA+q0RCjcTNmGczl7450QHiAoBWMwSVJAIN7aDtNTs/KpQBCanNFmpTqm6KJ+oQPYDichYD+r19uBPGIdrBMr2RinhJWNXwkuUrbvtZdbhdKJZ4hf3ELJHiHWTqoRQI3SaQ3xJdGubr1/UalAGhEwoYHit2oopAfHSijOzxwQJVDC3mVStWfsVYhV+ORK0lYkZllheMDUSgvSoQjzXyuAeQFL1tmIkMA+Kyh/jU/SHFaOSws/IIwBw7FIhTJD/AEWhvgxWEniubWOGR7EpT1xIBAXlaAmyRgeQLYB86TMTxIFy1Ho5m44wAxOcWLKWvFTutfLbyAyyQwrc72kBKT0nDWVqckwuo5AQgou+ANlSLsVF1MibSV0DckETGoGOAhJhGyJoIjZf2imY/ic+/YoGEaA75QN4DCOQWLKD/cQOBEk/hlm3MwlYrDDuA+Hxy0ARisylaFisBKfRM7W4gzJBB5wAZ9RtpDUiUssmPywIJS82HA/GZKIh3RkROlXFu7VCewAmxZhnOJRSApDEVug4O0noFPJjQNYvjFC19HLtlkpcVyVOknIWmzL7247gYIsnHY1c1CWCQcZOrLw0sH9GhYjwU0mcF/CAtE89iSsX8kHpIcx9PYwAQtDTE7dpROfGE2dgrpIxNgfFZrwqQZmq/qjbpiqMds+l1aNNsWAmIX/P8jRiCkkmyv+yuEtRuGwvbVshaX8IOnHrtcaNPloWy2qJGd2BWTRy5lMIEbD9mHAl+nEYQxtTyewOJ7EqBuvY+7+lWSkDSWm7UAOJJMi7kGEm9lHGDxbw+SD0mjmS2NR4QO2ktpMPW6rdglmFNnAQ/qwCkKgxd1i4PSQh9JmVhtI9rmz1RmJhXX5nOtLcDCKhPOeWGqhtfVA0WWCMCYcNnsqoGqKJitkroJrbssEzzEcloeFBPQ9DQPqsdpTKxiIuGPYBEjRaM3wwuDX0agw0GUnSQUP8l9NAmieguDhIUZVe2Vbr55qL2TXsd1gSDtllqArFZp9QHCLJavzTmiDWKiYFYHUkwm2UlpPJwayY+oFIHMIxJKrmqaZ/W/EAkn5jX2DWaQELeLbnsu+Ka9YWnA+Lm2dqK89VoyYM4jriYGliNAnYAEJ9kt/mYXkJTFkb7iI8HrkJQb85dD4hzaMkJYjbzqfRBHYHgNEC4RQblP+ybUKPR5Qr58mxZPyCQ2XE+3dqM9oDvPCcMEAfwdspOKxgAJKxXJz7ztpjTB+dBjh4QGzlCBZfFVBx2lTiuGAUq+4RMKYxrt7Bf+x1lDPi6mpewqXbqWK5NA2yKrpjRdDzB84Et1uKQJnbIocKIbFC231cAt87Yx/R45PGi8nibZL4xPmlMLhchfVYZ3WWgGpiM5uCWe1IMBJjHNIfrar+vKs2xJsVwgEkukVEmhS4Och9O9SwpglCzPn++1wUqmsLRGALYtBOgbI5pmuR/qi5IGxDYelWJZk3sy5BrQXUfD/i+Tlw1cdhuWL1IZkeKLX7QdiBxi+Z46glem9IsPZySxgl3gYp0NGgzoXh+EBCS+ALu6heoXcfM827YBwgYF0gQNjQ+DRArYPLPKnB5Wa2TRnIAdmUdceskiFslwEEd+FGONY2DKldd5U8k5QVjL8i3Q4Yu9fvkUNykqnpiVeOq3i1DyoZxcTz7sk+aU+XjjuNdRt8y7XVWuD8WgKrLxY/MjBRY/KAu2sR1IEGr5k6AljkOuH6+TU4ferzXw2/OYuiqdHtvQ+KOakr7avsEuhogytfa2WtMBsi5gQDuZhEDpL+4JIVJy2K27zAr2zJAhgvovgPvIsUAuR4gRs4uBogBYsQAMUCMGCAGiBEDxAAxYoAYIEYMECOd8n86Ffl0ymBnDwAAAABJRU5ErkJggg==" style="width: 190px; height: 100px;" class="uni-logo -mt-10" >
                    <div class="document-title">${doctype}</div>
                </center>
            </div>

            <div class="text-center mb-12">
                <p class="course-title">${courseName}</p>
                <p class="course-code">Course Code : ${courseCode}</p>
            </div>
            
            <div class="info-list">
                <ul class="w-full">
                    <li>Assignment Title : ${assignmentTitle}</li>
                    <li>Assignment No : ${assignmentNo}</li>
                    <li>Date Of Submission : ${formattedSubmissionDateAssignment}</li>
                </ul>
            </div>

            <table class="submission-table">
                <thead>
                    <tr>
                        <td>Submitted By:</td>
                        <td>Submitted To:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${studentName}</td>
                        <td>${teacherName}</td>
                    </tr>
                    <tr>
                        <td>Roll No : ${rollNo}</td>
                        <td>${designation}</td>
                    </tr>
                    <tr>
                        <td>Batch : ${batchNo}</td>
                        <td>${departmentTeacher}</td>
                    </tr>
                    <tr>
                        <td>Semester No : ${semesterNo}</td>
                        <td>Dhaka International University</td>
                    </tr>
                    <tr>
                        <td>${departmentStudent}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dhaka International University</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            `;
    }

    documentPreview.innerHTML = documentHTML;
    previewModal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => {
    previewModal.classList.add("hidden");
  });

  previewModal.addEventListener("click", (e) => {
    if (e.target === previewModal) {
      previewModal.classList.add("hidden");
    }
  });

  downloadPdf.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    const doc = new jsPDF("p", "mm", "a4");

    const canvasOptions = {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: 794, 
      height: 1123, 
      scrollX: 0,
      scrollY: 0,
    };

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "794px"; 
    tempContainer.style.backgroundColor = "#ffffff";
    tempContainer.style.fontFamily = "Times New Roman, Times, serif";
    tempContainer.style.padding = "40px";
    tempContainer.style.lineHeight = "1.6";
    tempContainer.innerHTML = documentPreview.innerHTML;

    const style = document.createElement("style");
    style.textContent = `
      .temp-pdf-container {
        min-height: 600px;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 40px;
        font-family: "Times New Roman", Times, serif;
        line-height: 1.6;
        width: 100%;
        max-width: 210mm;
        margin: 0 auto;
        box-sizing: border-box;
      }
      .temp-pdf-container .document-title {
        font-size: 3rem !important;
        font-weight: bold;
        color: orange;
        font-family: "Comic Neue", cursive;
        text-align: center;
        margin-bottom: 1rem;
      }
      .temp-pdf-container .course-title {
        font-size: 3.5rem !important;
        font-weight: bold;
        font-family: "Comic Relief", cursive;
        text-align: center;
        margin-bottom: 1.5rem;
      }
      .temp-pdf-container .course-code {
        font-size: 1.5rem !important;
        font-weight: bold;
        font-family: "Comic Relief", cursive;
        text-align: center;
      }
      .temp-pdf-container .info-list {
        font-family: "Outfit", sans-serif;
        margin: 2rem 0;
      }
      .temp-pdf-container .info-list li {
        font-size: 1.5rem !important;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      .temp-pdf-container .submission-table {
        font-family: "Outfit", sans-serif;
        margin-top: 2rem;
        font-size: 1.25rem !important;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
      }
      .temp-pdf-container .submission-table thead td {
        color: #059669;
        font-size: 1.5rem !important;
        font-weight: bold;
        padding: 1rem;
      }
      .temp-pdf-container .submission-table tbody td {
        padding: 0.5rem 1rem;
        word-wrap: break-word;
        vertical-align: top;
      }
      .temp-pdf-container .uni-logo {
        width: 190px !important;
        height: auto;
        margin: -2rem auto 0;
        display: block;
      }
      .temp-pdf-container table {
        width: 100%;
        margin-bottom: 20px;
        table-layout: fixed;
        border-collapse: collapse;
      }
      .temp-pdf-container td {
        padding: 6px 0;
        word-wrap: break-word;
        vertical-align: top;
      }
    `;

    tempContainer.className = "temp-pdf-container";
    document.head.appendChild(style);
    document.body.appendChild(tempContainer);

    html2canvas(tempContainer, canvasOptions)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png", 1.0);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const maxWidth = pageWidth - 20;
        const maxHeight = pageHeight - 40;

        const widthRatio = maxWidth / (imgWidth * 0.264583);
        const heightRatio = maxHeight / (imgHeight * 0.264583);
        const ratio = Math.min(widthRatio, heightRatio);

        const finalWidth = imgWidth * 0.264583 * ratio;
        const finalHeight = imgHeight * 0.264583 * ratio;

        const imgX = (pageWidth - finalWidth) / 2;
        const imgY = 20;

        doc.addImage(imgData, "PNG", imgX, imgY, finalWidth, finalHeight);

        const isLabReport = !labReportFields.classList.contains("hidden");
        const filename = isLabReport ? "lab-report.pdf" : "assignment.pdf";

        doc.save(filename);

        document.body.removeChild(tempContainer);
        document.head.removeChild(style);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Please try again.");

        if (document.body.contains(tempContainer)) {
          document.body.removeChild(tempContainer);
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      });
  });

  downloadDoc.addEventListener("click", () => {
    const saveAs = window.saveAs;

    const isLabReport = !labReportFields.classList.contains("hidden");
    const filename = isLabReport ? "lab-report.doc" : "assignment.doc";

    const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { 
                        font-family: "Times New Roman", Times, serif; 
                        margin: 40px; 
                        line-height: 1.6;
                        max-width: 210mm;
                        min-height: 600px;
                        background-color: white;
                    }
                    .document-title {
                        font-size: 3rem;
                        font-weight: bold;
                        color: orange;
                        font-family: "Comic Neue", cursive;
                        text-align: center;
                        margin-bottom: 1.5rem;
                    }
                    .course-title {
                        font-size: 4rem;
                        font-weight: bold;
                        font-family: "Comic Relief", cursive;
                        text-align: center;
                        margin-bottom: 1.5rem;
                    }
                    .course-code {
                        font-size: 1.5rem;
                        font-weight: bold;
                        font-family: "Comic Relief", cursive;
                        text-align: center;
                    }
                    .info-list {
                        font-family: "Outfit", sans-serif;
                        margin: 2rem 0;
                    }
                    .info-list li {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                    }
                    .submission-table {
                        font-family: "Outfit", sans-serif;
                        margin-top: 2rem;
                        font-size: 1.25rem;
                        width: 100%;
                        table-layout: fixed;
                        border-collapse: collapse;
                    }
                    .submission-table thead td {
                        color: #059669;
                        font-size: 1.5rem;
                        font-weight: bold;
                        padding: 1rem;
                    }
                    .submission-table tbody td {
                        padding: 0.5rem 1rem;
                        word-wrap: break-word;
                        vertical-align: top;
                    }
                    .uni-logo {
                        width: 190px;
                        height: auto;
                        margin: -2rem auto 0;
                        display: block;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        table-layout: fixed;
                        margin-bottom: 20px;
                    }
                    td { 
                        padding: 6px 0; 
                        word-wrap: break-word;
                        vertical-align: top;
                    }
                </style>
            </head>
            <body>
                ${documentPreview.innerHTML}
            </body>
            </html>
        `;

    const blob = new Blob([htmlContent], { type: "application/msword" });

    saveAs(blob, filename);
  });
});

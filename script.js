(function () {
  var rubros = Array.prototype.slice.call(document.querySelectorAll(".rubro[id]"));

  // Build the step nav from the actual sections in the page
  var nav = document.getElementById("stepnav");
  if (nav) {
    rubros.forEach(function (r) {
      var h2 = r.querySelector("h2");
      if (!h2) return;
      var a = document.createElement("a");
      a.href = "#" + r.id;
      a.textContent = h2.textContent;
      nav.appendChild(a);
    });
  }

  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll("a")) : [];

  function setActive() {
    var pos = window.scrollY + 140;
    var current = rubros[0];
    rubros.forEach(function (r) {
      if (r.offsetTop <= pos) current = r;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }
  if (rubros.length) {
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  // Search / filter
  var search = document.getElementById("search");
  var resultCount = document.getElementById("resultCount");
  if (search) {
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var visibleResources = 0;

      rubros.forEach(function (r) {
        if (!q) {
          r.classList.remove("is-hidden");
          r.querySelectorAll(".resource").forEach(function (res) {
            res.classList.remove("is-hidden");
          });
          return;
        }

        var rubroText = (r.querySelector("h2").textContent + " " + r.querySelector(".rubro-desc").textContent).toLowerCase();
        var rubroMatches = rubroText.indexOf(q) !== -1;
        var anyResourceVisible = false;

        var resources = r.querySelectorAll(".resource");
        if (resources.length) {
          resources.forEach(function (res) {
            var text = res.textContent.toLowerCase();
            var match = rubroMatches || text.indexOf(q) !== -1;
            res.classList.toggle("is-hidden", !match);
            if (match) { anyResourceVisible = true; visibleResources++; }
          });
          r.classList.toggle("is-hidden", !anyResourceVisible);
        } else {
          r.classList.toggle("is-hidden", !rubroMatches);
          if (rubroMatches) visibleResources++;
        }
      });

      if (resultCount) {
        resultCount.textContent = q ? (visibleResources + (visibleResources === 1 ? " resultado" : " resultados") + " para “" + search.value.trim() + "”") : "";
      }
    });
  }
})();

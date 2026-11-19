/*
  ============================================================
   EMOTIONS WHEEL — THE CHECKS
  ============================================================
  Rules that emotions.js should follow. Used by:
    • check.html          (open it in a browser for a friendly report)
    • tests/run-checks.js (runs automatically on GitHub after every change)
*/

function checkEmotions(data) {
  var problems = [];
  var warnings = [];
  var seen = {};
  var counts = { core: 0, middle: 0, outer: 0 };
  var hex = /^#[0-9a-fA-F]{6}$/;

  function where(path) { return path.join(" › "); }

  function checkItem(item, path, level) {
    var label = where(path.concat([item && item.name ? item.name : "(no name)"]));
    if (!item || typeof item !== "object") {
      problems.push("Something in " + where(path) + " isn't a proper { name: ..., definition: ... } block.");
      return;
    }
    if (!item.name || typeof item.name !== "string" || !item.name.trim()) {
      problems.push(label + " is missing a name.");
    } else {
      var key = item.name.trim().toLowerCase();
      if (seen[key]) warnings.push('"' + item.name + '" appears twice (' + seen[key] + " and " + label + ").");
      else seen[key] = label;
      var max = [14, 16, 16][level];
      if (item.name.length > max) warnings.push('"' + item.name + '" is quite long and may not fit in its slice (try ' + max + " letters or fewer).");
    }
    if (!item.definition || typeof item.definition !== "string" || !item.definition.trim()) {
      problems.push(label + " has no definition.");
    }
    if (item.more !== undefined && !Array.isArray(item.more)) {
      problems.push(label + ': "more" should be a list in square brackets [ ... ].');
    }
  }

  if (!Array.isArray(data)) {
    problems.push("emotions.js didn't produce a list of emotions. Check that it still starts with  var EMOTIONS = [");
    return { problems: problems, warnings: warnings, counts: counts };
  }
  if (data.length === 0) problems.push("There are no emotions in the list.");

  data.forEach(function (core) {
    counts.core++;
    checkItem(core, [], 0);
    if (!core || typeof core !== "object") return;
    if (!hex.test(core.color || "")) {
      problems.push((core.name || "A core emotion") + ' needs a color like "#F4A35C" (it has: ' + JSON.stringify(core.color) + ").");
    }
    if (!core.whatItMayMean) warnings.push((core.name || "A core emotion") + ' has no "whatItMayMean" text (optional, but the popup looks emptier).');
    var mids = Array.isArray(core.more) ? core.more : [];
    if (!mids.length) problems.push((core.name || "A core emotion") + ' has no middle-ring emotions in "more".');
    mids.forEach(function (mid) {
      counts.middle++;
      checkItem(mid, [core.name], 1);
      var outers = mid && Array.isArray(mid.more) ? mid.more : [];
      outers.forEach(function (outer) {
        counts.outer++;
        checkItem(outer, [core.name, mid.name], 2);
        if (outer && outer.more && outer.more.length) {
          warnings.push(where([core.name, mid.name, outer.name]) + ' has its own "more" list, but the wheel only shows three rings, so those are ignored.');
        }
      });
    });
  });

  return { problems: problems, warnings: warnings, counts: counts };
}

if (typeof module !== "undefined") module.exports = checkEmotions;

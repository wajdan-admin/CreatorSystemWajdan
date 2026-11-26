# Wajdan Content Research System
**How it works, what it costs, what runs on its own.** Updated 2026-11-26.

---

## 1. What was built

| File | What it holds |
|---|---|
| `creators.md` | **The single creator list.** 26 to model, 9 benchmarks, every one with a link and its multiple |
| `formats.md` | 8 formats, 11 hook patterns, the length rule, the 19/71 structure finding |
| `viral-playbook.md` | Formats mapped to Wajdan topics, plus the reuse grid (~35 live cells) |
| `meta-swipe.md` | Competitor ad headlines, longest runners, page IDs to re-query |
| `ideal-profile.md` | The locked spec and the 7 point post or kill test |
| `craft.md` | **How short form actually works.** Principles learned from teardowns, applied to every script |
| `swipe-file.md` | Reels Wajahat flagged as good, with why |
| `scripts/` | Locked, shoot ready scripts |
| `deliverables/` | The PDFs that go to Wajahat |

The expensive part is finished. Discovery cost about 130 vidIQ credits and produced all of the above.
Everything from here is monitoring and writing, which is close to free.

---

## 2. The three tools and why each one

### vidIQ — discovery
**150 free credits a month, refilling on the 24th.**
The only tool with semantic outlier search: find posts *about a topic* that beat their own creator's
median, from accounts nobody has heard of. That is how the 26 were found.

Use it for: entering a new niche, or researching a client's niche. **Not** for routine reel work.
Costs: 5 credits a search, 10 a teardown.

### Apify — monitoring and teardowns
**Free plan, $5 of usage a month. Connected and tested.**
Cheap per item, and the TikTok actor returns a verbatim timestamped transcript plus a timestamped
scene by scene description. That is the same output as a vidIQ teardown for a fifth of the effort.

| Operation | Actor | Cost |
|---|---|---|
| Scrape a reel | `apify/instagram-reel-scraper` | $0.0026 |
| Scrape a TikTok | `clockworks/tiktok-scraper` | $0.0037 |
| Transcript | either | $0.048 per started minute |
| Timestamped scene description | TikTok only | $0.0013 per second |
| Outlier scoring against a creator median | `moggedhq/instagram-reels-outlier-finder` | $0.002 per reel |

**A 60 second teardown is about $0.19.** Turn off `aiVideoSummary`, the scene list already covers it.

What Apify cannot do: find creators you have not already named. That is vidIQ's job.

### Meta Ad Library — paid headlines
**Free and unlimited through the connector.** No credits, no key, already working.
No spend or performance data is published, so longevity is the proxy. An ad running 90 days is
almost certainly profitable.

---

## 3. The four paths

### Path A. "Give me a reel about X"  —  £0, minutes
Pull the format and hook pattern from the library, write, claim check, deliver.
**This covers most requests.** Nothing is spent.

### Path B. "Make something like this [link]"  —  ~$0.19
Apify teardown for the transcript and scene structure, extract the beats, translate to Wajdan,
write. Use this when the reference is not already torn down.

### Path C. "What is working right now?"  —  ~$3
Scrape the last 30 posts from all 26 creators (~$2.05), compute each post's multiple against that
creator's median, surface anything above about 5x, teardown the top five (~$0.19 each).
Produces fresh hooks that are currently working. **Monthly cadence.**

### Path E. "Learn this"  —  ~$0.05
A link or a script sent to be learned from, not copied. Tear it down, pull the transferable
principle, add it to `craft.md` with its source, then say which existing scripts break the new
rule. This is training, not a reel request.

### Path D. New niche or a client's niche  —  40 vidIQ credits
Full discovery pass. Account discovery plus outlier searches across concept, hook and format.
Produces a new creator list for that niche. Roughly once a quarter at most.

---

## 4. What is automatic, honestly

**Nothing yet.** Every path above is triggered by asking.

What could be automated: a scheduled monthly task that runs Path C, ranks the outliers and reports
the new hooks without being asked. That is a real option and has not been set up.

---

## 5. The thing that breaks this

**This container is temporary and the repository push is blocked.** Everything above exists as
local commits and as files already downloaded. If a new session starts, none of it is loaded
automatically.

Until GitHub write access is fixed, the research base has to be re-uploaded at the start of any
new session, or the system starts from nothing. **This is the single biggest risk to the whole
setup.** Fixing the GitHub permission is worth more than any tool spend.

---

## 6. Cost summary

| Layer | Cost |
|---|---|
| Writing reels from the library | £0 |
| Paid ad research | £0, unlimited |
| Monthly creator monitoring and teardowns | ~$3, inside Apify's free $5 |
| New niche discovery | £0, inside vidIQ's free 150 credits |
| **Total running cost** | **£0** |

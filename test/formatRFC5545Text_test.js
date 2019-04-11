import helpersClass from "../src/helpers";


describe("helpers", () => {
  const CHARS_10 = "1234567890";
  const CHARS_75 = [ CHARS_10, CHARS_10, CHARS_10, CHARS_10, CHARS_10, CHARS_10, CHARS_10, CHARS_10 ].join("").substr(0, 75);
  const helpers = new helpersClass();


  describe("formatRFC5545Text", () => {
    it("should format a false-y value", () => {
      expect(helpers.formatRFC5545Text("")).to.equal("");
      expect(helpers.formatRFC5545Text()).to.equal("");
      expect(helpers.formatRFC5545Text(null)).to.equal("");
    });

    it("should format a short String", () => {
      expect(helpers.formatRFC5545Text("x")).to.equal("x");
      expect(helpers.formatRFC5545Text(CHARS_75)).to.equal(CHARS_75);
    });

    it("should split a String every 75 characters", () => {
      expect(helpers.formatRFC5545Text(`${CHARS_75}x`)).to.equal(`${CHARS_75}\n x`);
      expect(helpers.formatRFC5545Text(`${CHARS_75}${CHARS_75}x`)).to.equal(`${CHARS_75}\n ${CHARS_75}\n x`);
    });

    it("should escape CRs and CRLFs", () => {
      expect(helpers.formatRFC5545Text(`
carriage return
line feed`)).to.equal("\\ncarriage return\\nline feed");
      expect(helpers.formatRFC5545Text("carriage\rreturn\r")).to.equal("carriage\\nreturn\\n");
    });

    it("should split a String with escaped CRLFs", () => {
      const CHARS_74 = CHARS_75.substr(0, 74);
      expect(helpers.formatRFC5545Text(`${CHARS_75}\n${CHARS_10}`)).to.equal(`${CHARS_75}\n \\n${CHARS_10}`);
      expect(helpers.formatRFC5545Text(`${CHARS_74}\n${CHARS_10}`)).to.equal(`${CHARS_74}\\\n n${CHARS_10}`);
    });
  });


  describe("buildUrl", () => {
    const EVENT = {
      startTime: "2019-04-10T00:00:00Z",
      endTime: "2019-04-10T01:02:03Z",
      location: CHARS_10,
      title: "TITLE\n\nON MULTIPLE LINES",
      description: [ CHARS_10, CHARS_75, CHARS_10 ].join("\n"),
    };

    it("honors RFC-5545 by default", () => {
      const calendarUrl = helpers.buildUrl(EVENT, "");
      expect(calendarUrl).to.equal(`
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${document.URL}
DTSTART:20190410T000000Z
DTEND:20190410T010203Z
SUMMARY:TITLE\\n\\nON MULTIPLE LINES
DESCRIPTION:1234567890\\n123456789012345678901234567890123456789012345678901234567890123
 456789012345\\n1234567890
LOCATION:1234567890
END:VEVENT
END:VCALENDAR
      `.trim());
    });

    it("does not use RFC-5545 for { type: 'google' }", () => {
      const calendarUrl = helpers.buildUrl(EVENT, "google");
      expect(calendarUrl).to.equal("https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20190410T000000Z/20190410T010203Z&location=1234567890&text=TITLE%0A%0AON%20MULTIPLE%20LINES&details=1234567890%0A123456789012345678901234567890123456789012345678901234567890123456789012345%0A1234567890");
    });

    it("does not use RFC-5545 for { type: 'yahoo' }", () => {
      const calendarUrl = helpers.buildUrl(EVENT, "yahoo");
      expect(calendarUrl).to.equal("https://calendar.yahoo.com/?v=60&view=d&type=20&title=TITLE%0A%0AON%20MULTIPLE%20LINES&st=20190410T000000Z&dur=1:02&desc=1234567890%0A123456789012345678901234567890123456789012345678901234567890123456789012345%0A1234567890&in_loc=1234567890");
    });

    it("does not use RFC-5545 for { type: 'outlookcom' }", () => {
      const calendarUrl = helpers.buildUrl(EVENT, "outlookcom");
      expect(calendarUrl).to.match(new RegExp("https://outlook.live.com/owa/[?]rru=addevent&startdt=20190410T000000Z&enddt=20190410T010203Z&subject=TITLE%0A%0AON%20MULTIPLE%20LINES&location=1234567890&body=1234567890%0A123456789012345678901234567890123456789012345678901234567890123456789012345%0A1234567890&allday=false&uid=[0-9]+_[0-9]+&path=/calendar/view/Month"));
    });
  });
});
const { toPronoteWeek } = require('../data/dates');
const { getFileURL } = require('../data/files');
const fromHTML = require('../data/html');

const getContents = require('./pronote/contents');

async function contents(session, user, from = new Date(), to = null)
{
    from.setDate(from.getDate() - 1);
    from.setHours(6);

    if (!to || to < from) {
        to = new Date(from.getTime());
        to.setDate(to.getDate() + 1);
    }

    const fromWeek = toPronoteWeek(session, from);
    const toWeek = toPronoteWeek(session, to);

    const contents = await getContents(session, user, fromWeek, toWeek);
    if (!contents) {
        return null;
    }

    const result = [];

    for (const lesson of contents.lessons) {
        if (lesson.from < from || lesson.to > to) {
            continue;
        }

        const content = (lesson.content[0] == undefined) ? lesson.content : lesson.content[0]; // Maybe on some instances there will be multiple entries ? Check this
        result.push({
            subject: lesson.subject.name,
            teachers: lesson.teachers.map(t => t.name),
            from: lesson.from,
            to: lesson.to,
            color: lesson.color,
            description: fromHTML(content.description),
            htmlDescription: content.htmlDescription,
            files: (lesson.content.files == undefined) ? [] : content.files.map(f => ({ name: f.name, url: getFileURL(session, f) }))
        });
    }

    return result.sort((a, b) => a.from - b.from);
}

module.exports = contents;

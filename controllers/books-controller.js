const Book = require("../models/Book");
const asyncHandler = require("../middlewares/asyncHandler");
const httpError = require("../utils/httpError");
// const csv = require("csvtojson");
//#region ~ add - /api/v1/product - Upload a Product - Private
let ss = `
103,God Emperor of Dune (Dune Chronicles  #4),Frank Herbert,3.84,0441294677,9780441294671,eng,423,2785,166,6/15/1987,Ace Books
105,Chapterhouse: Dune (Dune Chronicles #6),Frank Herbert,3.91,0441102670,9780441102679,eng,436,38778,568,7/1/1987,Ace Books
106,Dune Messiah (Dune Chronicles #2),Frank Herbert,3.88,0441172695,9780441172696,eng,331,97494,2359,7/15/1987,Ace Books
107,Dreamer of Dune: The Biography of Frank Herbert,Brian Herbert,4.01,0765306476,9780765306470,en-US,592,784,21,7/1/2004,Tor Books
109,Heretics of Dune (Dune Chronicles  #5),Frank Herbert,3.86,0399128980,9780399128981,eng,480,272,20,4/16/1984,Putnam
110,The Road to Dune,Frank Herbert/Brian Herbert/Kevin J. Anderson,3.88,0765353709,9780765353702,eng,426,4789,83,8/29/2006,Tor Science Fiction
117,Heretics of Dune (Dune Chronicles #5),Frank Herbert,3.86,0441328008,9780441328000,eng,471,45388,644,8/15/1987,Ace Books
119,The Lord of the Rings: The Art of the Fellowship of the Ring,Gary Russell,4.59,0618212906,9780618212903,eng,192,26153,102,6/12/2002,Houghton Mifflin Harcourt
122,The Power of One (The Power of One  #1),Bryce Courtenay,4.35,034541005X,9780345410054,eng,544,69167,4551,9/29/1996,Ballantine Books
123,The Power of One (The Power of One  #1),Bryce Courtenay,4.35,0385732546,9780385732543,eng,291,45,13,9/13/2005,Delacorte Books for Young Readers
129,The Power of One: One Person  One Rule  One Month,John C. Maxwell/Stephen R. Graves/Thomas G. Addington,4.28,0785260056,9780785260059,en-US,256,16,1,11/1/2004,Thomas Nelson
130,Power of an Hour: Business and Life Mastery in One Hour a Week,Dave Lakhani,3.34,0471780936,9780471780939,eng,205,174,16,5/19/2006,Wiley
131,The Power of One: The Solo Play for Playwrights  Actors  and Directors,Louis E. Catron,3.67,0325001537,9780325001531,eng,240,10,0,2/7/2000,Heinemann Drama
132,How to Buy  Sell & Profit on eBay: Kick-Start Your Home-Based Business in Just Thirty Days,Adam Ginsberg,3.48,006076287X,9780060762872,eng,336,76,9,5/3/2005,William Morrow Paperbacks
133,eBay for Dummies,Marsha Collier,3.50,0470045299,9780470045299,eng,386,111,9,10/30/2006,Wiley
135,What to Sell on ebay and Where to Get It: The Definitive Guide to Product Sourcing for eBay and Beyond,Chris Malta/Lisa Suttora,3.62,0072262788,9780072262780,eng,260,24,0,1/24/2006,McGraw-Hill
137,Starting an eBay Business for Dummies,Marsha Collier,3.55,0764569244,9780764569241,eng,384,55,4,9/17/2004,Wiley
138,eBay: Top 100 Simplified Tips & Tricks,Julia Wilkinson,4.27,0471933821,9780471933823,eng,260,9,0,6/6/2006,Wiley
139,ebay Timesaving Techniques for Dummies,Marsha Collier,3.39,0764559915,9780764559914,en-US,391,22,1,5/31/2004,Wiley
140,eBay Business All-in-One Desk Reference for Dummies,Marsha Collier,3.89,0764584383,9780764584381,en-US,864,17,3,4/25/2005,Wiley
141,Ruby Cookbook,Lucas Carlson/Leonard Richardson,3.84,0596523696,9780596523695,eng,873,166,4,7/29/2006,O'Reilly Media
142,Ruby Ann's Down Home Trailer Park Cookbook,Ruby Ann Boxcar,4.12,0806523492,9780806523491,eng,240,50,5,5/3/2005,Citadel
144,Ruby Ann's Down Home Trailer Park BBQin' Cookbook,Ruby Ann Boxcar,4.08,0806525363,9780806525365,eng,206,13,2,5/3/2005,Citadel
147,Rails Cookbook: Recipes for Rapid Web Development with Ruby,Rob Orsini,3.48,0596527314,9780596527310,eng,514,64,1,1/1/2007,O'Reilly Media
151,Anna Karenina,Leo Tolstoy/Richard Pevear/Larissa Volokhonsky,4.05,0143035002,9780143035008,eng,838,16643,1851,5/31/2004,Penguin Classics
152,Anna Karenina,Leo Tolstoy/David Magarshack/Priscilla Meyer,4.05,0451528611,9780451528612,eng,960,109420,5696,11/5/2002,Signet
153,Anna Karenina,Leo Tolstoy/Richard Pevear/Larissa Volokhonsky/John Bayley,4.05,0140449175,9780140449174,eng,837,2904,309,1/30/2003,Penguin Books
154,CliffsNotes on Tolstoy's Anna Karenina,Marianne Sturman/Leo Tolstoy,3.85,0822001837,9780822001836,eng,80,16,3,11/26/1965,Cliffs Notes
155,Anna Karenina,Leo Tolstoy/Amy Mandelker/Constance Garnett,4.05,1593080271,9781593080273,eng,803,9564,726,7/1/2003,Barnes & Noble Classics
156,Anna Karenina,Leo Tolstoy/Louise Maude/Aylmer Maude,4.05,0486437965,9780486437965,eng,752,474,72,11/23/2004,Dover Publications
157,Anna Karenina,Leo Tolstoy/Constance Garnett/Amy Mandelker,4.05,1593081774,9781593081775,eng,803,303,48,8/26/2004,Barnes & Noble
159,Dinner with Anna Karenina,Gloria Goldreich,2.99,0778322270,9780778322276,eng,360,411,65,1/28/2006,Mira Books
160,Tolstoy: Anna Karenina,Anthony Thorlby,4.19,0521313252,9780521313254,eng,128,1204,33,11/26/1987,Cambridge University Press
162,Untouchable,Mulk Raj Anand/E.M. Forster,3.71,0140183957,9780140183955,eng,160,3429,279,7/3/1990,Penguin Books
163,The Untouchable,John Banville,3.95,0679767479,9780679767473,eng,367,2163,216,6/30/1998,Vintage
164,The Untouchables,Eliot Ness/Oscar Fraley,3.89,1568491980,9781568491981,eng,256,613,31,2/1/1996,Buccaneer Books
165,Untouchables: My Family's Triumphant Journey Out of the Caste System in Modern India,Narendra Jadhav,3.82,0743270797,9780743270793,en-US,320,308,40,9/27/2005,Scribner
166,Dalit: The Black Untaouchables of India,V.T. Rajshekar/Y.N. Kly,4.20,0932863051,9780932863058,eng,100,10,0,1/28/1995,Clarity Press
168,Growing Up Untouchable in India: A Dalit Autobiography,Vasant Moon/Gail Omvedt/Eleanor Zelliot,3.65,0742508803,9780742508804,eng,224,16,4,12/20/2000,Rowman & Littlefield Publishers
171,The Evidence-Based Social Work Skills Book,Barry R. Cournoyer,3.40,0205358624,9780205358625,eng,216,10,0,9/22/2003,Pearson
177,A Wrinkle in Time: A Guide for Using "A Wrinkle in Time" in the Classroom,John Carratello/Patty Carratello/Theresa Wright,4.00,1557344035,9781557344038,eng,48,17,0,9/28/1991,Teacher Created Resources
180,Wrinkles in Time,George Smoot/Keay Davidson,4.01,0380720442,9780380720446,eng,360,1035,23,10/1/1994,Harper Perennial
181,A Wrinkle in Time: With Related Readings (A Wrinkle in Time Quintet #1),Madeleine L'Engle,4.00,0821925326,9780821925324,eng,250,36,6,5/1/2002,EMC/Paradigm Publishing
182,Literature Circle Guide: A Wrinkle in Time,Tara MacCarthy,3.60,043927169X,9780439271691,eng,32,15,0,1/1/2002,Teaching Resources
201,Una arruga en el tiempo – A Wrinkle in Time,Madeleine L'Engle,4.00,0606105263,9780606105262,spa,205,6,1,6/1/1984,Turtleback Books
204,The Long Shadow (The Morland Dynasty  #6),Cynthia Harrod-Eagles,4.12,0751506435,9780751506433,eng,367,376,17,6/1/1994,Little  Brown Book Group
205,A Long Shadow (Inspector Ian Rutledge  #8),Charles Todd,4.11,006078671X,9780060786717,eng,352,3086,237,1/3/2006,William Morrow
207,Long Way Round: Chasing Shadows Across the World,Ewan McGregor/Charley Boorman/Robert Uhlig,3.94,0743499344,9780743499347,en-US,320,352,44,11/1/2005,Atria Books
208,A Shadow in Summer (Long Price Quartet  #1),Daniel Abraham,3.60,0765313405,9780765313409,eng,331,9852,633,3/7/2006,Tor Books
213,New Hope for the Dead (Hoke Mosely #2),Charles Willeford/James Lee Burke,3.90,1400032490,9781400032495,eng,244,821,78,8/10/2004,Vintage Crime/Black Lizard
214,Sideswipe: A Hoke Moseley Novel,Charles Willeford/Lawrence Block,4.05,1400032482,9781400032488,eng,215,731,72,3/8/2005,Vintage Crime/Black Lizard
`;
function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
exports.addBook = asyncHandler(async (req, res, next) => {
  try {
    let data = await Book.insertMany(csvJSON(ss));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
//#endregion

exports.createBook = asyncHandler(async (req, res, next) => {
  try {
    let book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
});

exports.updateBook = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.query);
    let book = await Book.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  try {
    let book = await Book.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: `${book.title} is deleted` });
  } catch (error) {
    console.log(error);
  }
});

exports.getBooks = asyncHandler(async (req, res, next) => {
  try {
    let searchQuery = req.query.search;
    let options = searchQuery
      ? {
          title: { $regex: searchQuery, $options: "i" },
        }
      : {};
    console.log(options);
    let books = await Book.find(options).exec();
    let booksLength = books.length;

    if (req.query.page) {
      let pageSize = req.query.pageSize || 10;
      const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + Number(pageSize);
      console.log(startIndex, endIndex);
      books = books.slice(startIndex, endIndex);
    }

    res.status(200).json({ books, total: booksLength });
  } catch (error) {
    console.log(error);
  }
});
